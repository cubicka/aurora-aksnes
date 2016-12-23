import lodash from 'lodash'
import SubHelper from '../helper/sub'
import {Query} from './etalase'

const initialState = {
    // cartItem: [0, 1, 2, 3],
    // items: {
    //     0: {
    //         idx: 0,
    //         quantity: 3,
    //         keyword: "kecap",
    //         nama: "kecap",
    //     },
    //     1: {
    //         idx: 1,
    //         quantity: 7,
    //         keyword: "garam",
    //         nama: "garam",
    //     }, 
    //     2: {
    //         idx: 2,
    //         quantity: 100,
    //         keyword: "terasi",
    //         nama: "terasi",
    //     }, 
    //     3: {
    //         idx: 3
    //     }
    // },
    cartItem: [0],
    items: {
        0: {
            idx: 0
        }
    },
    timeout: {},
    idx: [0, 0],
    lastIdx: 0,
    sortOrder: [false, false, false],
    prevState: [],
    nextState: [],
    filterKey: ""
};

function SortCart(cart, {sortID, itemColls}) {
    const {sortOrder, cartItem, items: itemsCart} = cart;

    const items = lodash.map(cartItem.slice(0, cartItem.length - 1), (id) => {
        return itemsCart[id];
    })

    let sortedItems = lodash.sortBy(items, (item) => {
        if (sortID === 0) {
            return item.quantity;
        } else if (sortID === 1) {
            return item.nama.toLowerCase();
        } else {
            const hm = lodash.find(itemColls.items, (it) => {
                return it.idx === item.idx;
            });

            return (hm && (parseInt(hm.price, 10) * hm.quantity)) || 0;
        }
    })

    if (sortOrder[sortID]) {
        return lodash.reverse(sortedItems);
    }

    return sortedItems;
}

function AddNewRow(state) {
    const nextIdx = state.lastIdx + 1;

    return lodash.assign({}, state, {
        cartItem: [...state.cartItem, nextIdx],
        lastIdx: nextIdx,
        items: lodash.assign({}, state.items, {
            [nextIdx]: {
                idx: nextIdx
            }
        })
    })
}

function AddCartAfter(state, cartID) {
    const {cartItem, lastIdx} = state;
    const idx = cartItem.indexOf(cartID);

    return [...cartItem.slice(0, idx + 1), lastIdx, ...cartItem.slice(idx + 1, cartItem.length - 1), lastIdx + 1];
}

let prevState = localStorage.cart && JSON.parse(localStorage.cart);
if (prevState) {
    prevState.prevState = [];
    prevState.nextState = [];
}

function SaveToComp(state) {
    localStorage.cart = JSON.stringify(state);
    return state;
}

function OneWay(oldState, newState) {
    let syalala = lodash.assign({}, oldState);
    delete syalala.prevState;
    delete syalala.nextState;

    let nexx = lodash.assign({}, newState, {
        prevState: [...(oldState.prevState || [])],
        nextState: []
    });

    nexx.prevState.push(JSON.stringify(syalala));
    localStorage.cart = JSON.stringify(nexx);

    return nexx;
}

function Undo(state) {
    if (!state.prevState || state.prevState.length === 0) {
        return state;
    }

    let prevs = JSON.parse(state.prevState[state.prevState.length - 1]);
    const sliced = state.prevState ? state.prevState.slice(0, state.prevState.length -1) : [];
    prevs.prevState = sliced;
    prevs.nextState = [...(state.nextState || [])];

    let syalala = lodash.assign({}, state);
    delete syalala.prevState;
    delete syalala.nextState;

    prevs.nextState.push(JSON.stringify(syalala));
    return prevs;
}

function Redo(state) {
    if (!state.nextState || state.nextState.length === 0) {
        return state;
    }

    let prevs = JSON.parse(state.nextState[state.nextState.length - 1]);
    const sliced = state.nextState ? state.nextState.slice(0, state.nextState.length -1) : [];
    prevs.nextState = sliced;
    prevs.prevState = [...(state.prevState || [])];

    let syalala = lodash.assign({}, state);
    delete syalala.prevState;
    delete syalala.nextState;

    prevs.prevState.push(JSON.stringify(syalala));
    return prevs;
}

export default (state = prevState || initialState, action) => {
    switch(action.type) {
        case "cart/undo": {
            return Undo(state);
        }

        case "cart/redo": {
            return Redo(state);
        }

        case "cart/reorder": {
            const syalala = lodash.assign({}, state, {
                cartItem: action.order
            })

            return SaveToComp(syalala);
        }

        case "cart/filter": {
            const syalala = lodash.assign({}, state, {
                filterKey: action.filterKey
            })

            return SaveToComp(syalala);
        }

        case "cart/update": {
            const {id, attr, value} = action;
            const oldObj = state[id];

            const syalala = lodash.assign({}, state, {
                [id]: lodash.assign({}, oldObj, {
                    [attr]: value
                })
            })

            return SaveToComp(syalala);
        }

        case "cart/updateQuantity": {
            const {id, quantity} = action;
            const oldObj = state.items[id];

            let newItems = {
                [id]: lodash.assign({}, oldObj, {
                    quantity: Math.abs(quantity),
                })
            }

            const syalala = lodash.assign({}, state, {
                items: lodash.assign({}, state.items, newItems),
                timeout: lodash.assign({}, state.timeout, {
                    [action.id]: null
                }),
            })

            return OneWay(state, syalala);
        }

        case "cart/updateItem": {
            const {id, keyword, nama} = action;
            const oldObj = state.items[id];

            let newItems = {
                [id]: lodash.assign({}, oldObj, {
                    keyword, nama,
                    quantity: oldObj && oldObj.quantity ? oldObj.quantity : 0
                })
            }

            const lastIdx = state.lastIdx;
            const cartItem = state.cartItem;

            if (id === lastIdx) {
                newItems[lastIdx + 1] = {
                    idx: lastIdx + 1
                };
            }

            const syalala = lodash.assign({}, state, {
                items: lodash.assign({}, state.items, newItems),
                timeout: lodash.assign({}, state.timeout, {
                    [action.id]: null
                }),
                lastIdx: id === lastIdx ? lastIdx + 1 : lastIdx,
                cartItem: id === lastIdx ? [...cartItem, lastIdx + 1] : cartItem
            })

            if ('quantity' in oldObj) {
                return SaveToComp(syalala);
            } else {
                return OneWay(state, syalala);
            }
        }

        case "cart/delete": {
            const idx = lodash.findIndex(state.cartItem, (x) => (x === action.idx));
            if (idx === state.cartItem.length - 1) {
                return state;
            }


            const syalala = lodash.assign({}, state, {
                cartItem: [
                    ...state.cartItem.slice(0, idx),
                    ...state.cartItem.slice(idx + 1, state.cartItem.length)
                ]
            });

            return OneWay(state, syalala);
        }

        case "cart/move": {
            const syalala = lodash.assign({}, state, {
                idx: action.idx
            });

            return SaveToComp(syalala);
        }

        case "cart/timeout": {
            const syalala = lodash.assign({}, state, {
                timeout: lodash.assign({}, state.timeout, {
                    [action.id]: action.timeout
                })
            })

            return SaveToComp(syalala);
        }

        case "cart/inc": {
            const syalala = Inc(state, action);

            return OneWay(state, syalala);
        }

        case "cart/dec": { 
            const syalala = Dec(state, action);

            return OneWay(state, syalala);
        }

        case "cart/sort": {
            const newCart = SortCart(state, action);
            const cart2 = lodash.map(newCart, (item) => {
                return item.idx
            })

            let newSort = [...state.sortOrder];
            newSort[action.sortID] = !(newSort[action.sortID]);
            const syalala = lodash.assign({}, state, {
                cartItem: [...cart2, state.cartItem[state.cartItem.length-1]],
                sortOrder: newSort,
                filterKey: ""
            })

            return SaveToComp(syalala);
        }

        default: return state;
    }
}

export function Move(row, col) {
    return (dispatch, getState) => {
        const {cart, etalase} = getState();

        const item = cart.items[row];
        if (item && item.keyword && (item.keyword !== etalase.currentKeyword || etalase.loading)) {
            const {timeout} = cart;
            if (timeout["query"]) {
                clearTimeout(timeout["query"]);
            }

            const newTimeout = setTimeout(() => {
                dispatch(Query(item.keyword))
            }, 500);

            dispatch({
                type: "cart/timeout",
                id: "query",
                timeout: newTimeout
            })
        }

        dispatch({
            type: "cart/move",
            idx: [row, col]
        })

        const {idx, lastIdx} = cart;
        if (row !== idx[0] && row !== lastIdx && item.keyword !== etalase.currentKeyword) {
            dispatch({
                type: "etalase/startLoading",
                idx: [row, col]
            })
        }
    }
}

export function MoveUp(row) {
    return (dispatch, getState) => {
        const {cart} = getState();

        const idx = cart.cartItem.indexOf(row);

        if (idx === -1) {
            return;
        }

        const x = Math.max(0, idx - 1);
        dispatch(Move(cart.cartItem[x], cart.idx[1]));
    }
}

export function MoveDown(row) {
    return (dispatch, getState) => {
        const {cart} = getState();

        const idx = cart.cartItem.indexOf(row);

        if (idx === -1) {
            return;
        }

        const x = Math.min(cart.cartItem.length - 1, idx + 1);
        dispatch(Move(cart.cartItem[x], cart.idx[1]));
    }
}

// function Update(state, id, updateFn) {
//     const currentVal = (id in state) ? state[id] : 0;

//     return lodash.assign({}, state, {
//         [id]: updateFn(currentVal)
//     })
// }

export function UpdateQuantity(id, newQuantity) {
    return (dispatch, getState) => {
        dispatch({
            type: "cart/updateQuantity",
            id: id,
            quantity: newQuantity
        });
    }
}

export function UpdateKeyword(id, newKeyword) {
    return (dispatch, getState) => {
        const {cart} = getState();
        const {timeout} = cart;

        if (timeout[id]) {
            clearTimeout(timeout[id]);
        }

        dispatch({
            type: "etalase/startLoading"
        })

        dispatch({
            type: "cart/updateItem",
            id: id,
            keyword: newKeyword,
            nama: newKeyword
        });

        const newTimeout = setTimeout(() => {
            dispatch(Query(newKeyword));
        }, 1000);

        dispatch({
            type: "cart/timeout",
            id: id,
            timeout: newTimeout
        })
    }
}

function Inc(state, {itemID, keyword, item}) {
    const {cartItem, items} = state;
    const cartItems = lodash.map(cartItem, (id) => {
        return items[id];
    })

    const validItem = lodash.find(cartItems, (item) => {
        return item.realID === itemID || (item.keyword === keyword && item.quantity === 0);
    })

    const keywordedItem = lodash.find(cartItems, (item) => {
        return item.keyword === keyword && item.nama === keyword;
    })

    if (validItem) {
        return lodash.assign({}, state, {
            items: lodash.assign({}, state.items, {
                [validItem.idx]: lodash.assign({}, validItem, {
                    quantity: validItem.quantity + 1,
                    realID: itemID,
                    nama: item.nama,
                    keyword: keyword
                })
            })
        })
    }

    if (keywordedItem) {
        return lodash.assign({}, state, {
            items: lodash.assign({}, state.items, {
                [keywordedItem.idx]: lodash.assign({}, keywordedItem, {
                    quantity: keywordedItem.quantity + 1,
                    realID: itemID,
                    nama: item.nama,
                    keyword: keyword
                })
            })
        })
    }

    const newState = AddNewRow(state);
    let lastKeywordIdx = lodash.reduce(cartItems, (acc, item, idx) => {
        if (item.keyword === keyword && (acc === idx - 1 || acc === -1)) {
            return idx;
        }

        return acc;
    }, -1);

    const firstKeyword = lastKeywordIdx !== -1 && cartItems[lastKeywordIdx];

    return lodash.assign({}, newState, {
        cartItem: firstKeyword ? AddCartAfter(state, firstKeyword.idx) : newState.cartItem,
        items: lodash.assign({}, newState.items, {
            [state.lastIdx]: lodash.assign({}, newState.items[state.lastIdx], {
                quantity: 1,
                nama: item.nama,
                keyword: keyword,
                realID: itemID
            })
        })
    })
}

function Dec(state, {itemID, keyword, item}) {
    const {cartItem, items} = state;
    const cartItems = lodash.map(cartItem, (id) => {
        return items[id];
    })

    const validItem = lodash.find(cartItems, (item) => {
        return item.realID === itemID;
    })

    const keywordFound = lodash.countBy(cartItems, (item) => {
        return item.keyword === keyword;
    })[true];

    if (validItem) {
        if (keywordFound === 1 || validItem.quantity > 1) {
            return lodash.assign({}, state, {
                items: lodash.assign({}, state.items, {
                    [validItem.idx]: lodash.assign({}, validItem, {
                        quantity: Math.max(0, validItem.quantity - 1),
                        nama: validItem.quantity <= 1 ? validItem.keyword : item.nama,
                        keyword: keyword
                    })
                })
            })
        }

        const itemIdx = cartItem.indexOf(validItem.idx);
        return lodash.assign({}, state, {
            cartItem: [...cartItem.slice(0, itemIdx), ...cartItem.slice(itemIdx + 1)],
            items: lodash.assign({}, state.items, {
                [validItem.idx]: {}
            })
        })
    }

    return state;
}

export function FilterCart(txt) {
    return (dispatch, getState) => {
        const {cart} = getState();
        const {cartItem, items} = cart;
        const filteredItems = lodash.groupBy(cartItem, (id) => {
            return items[id] && items[id].nama && items[id].nama.toLowerCase().indexOf(txt) > -1;
        })

        const newCart = lodash.reduce([true, false], (acc, val) => {
            if (val in filteredItems) {
                return [...acc, ...filteredItems[val]]
            }

            return acc;
        }, [])

        const eta = lodash.map(filteredItems[true] || [], (id) => {
            return items[id].realID
        })

        dispatch({
            type: "cart/filter",
            filterKey: txt
        })

        dispatch({
            type: "cart/reorder",
            order: newCart
        })

        if (txt !== "") {
            dispatch({
                type: "etalase/customOrder",
                display: eta
            })
        }
    }
}

function Cart(state) {
    const {cart, item: itemColls, etalase} = state;
    const {items, idx, cartItem, filterKey} = cart;
    const {display} = etalase;

    return {
        items: lodash.map(cartItem, (id) => {
            const found = lodash.find(display, (idx) => {
                return idx === items[id].realID;
            })

            return lodash.assign({}, items[id], {
                price: items[id].realID ? itemColls[items[id].realID].harga : 0,
                inDisplay: items[id].realID && found
            })
        }),
        idx, filterKey,
    }
}

function Count(state) {
    const {cart} = state;
    const {items, cartItem} = cart;

    const cartItems = lodash.chain(cartItem)
        .map((id) => {
            return items[id]
        })
        .filter((item) => {
            return item.realID
        })
        .value();

    const count = lodash.reduce(cartItems, (acc, item) => {
        return lodash.assign({}, acc, {[item.realID]: item.quantity});
    }, {});

    return count;
}

export const Sub = SubHelper({
    'cart/cart': Cart,
    'cart/count': Count,
})
