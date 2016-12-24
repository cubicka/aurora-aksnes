import lodash from 'lodash'
import SubHelper from '../helper/sub'
import fetch from 'isomorphic-fetch'
import {Sub as CartSub} from '../reducer/cart'
import config from '../config.json'

const initialState = {
    display: [],
    libs: {},
    currentKeyword: ""
}

function ResortDisplay(display, countState) {
    return lodash.sortBy(display, (id) => {
        return countState[id] > 0 ? -1 : 0
    });
}

export default (state = initialState, action) => {
    if (action.type === "etalase/customOrder") {
        return lodash.assign({}, state, {
            display: action.display
        })
    }

    if (action.type === "etalase/update") {
        return lodash.assign({}, state, {
            display: ResortDisplay(action.display, action.countState),
            libs: lodash.assign({}, state.libs, {
                [action.keyword]: action.display
            }),
            currentKeyword: action.keyword
        });
    }

    if (action.type === "etalase/showKey") {
        return lodash.assign({}, state, {
            display: ResortDisplay(state.libs[action.keyword], action.countState),
            currentKeyword: action.keyword
        })
    }

    if (action.type === "etalase/startLoading") {
        return lodash.assign({}, state, {
            loading: true
        });
    }

    if (action.type === "etalase/stopLoading") {
        return lodash.assign({}, state, {
            loading: false
        });
    }

    if (action.type === "items/delete") {
        const newDisplay = lodash.filter(state.display, (x) => {
            return x !== action.id;
        })

        let newLibs = {};
        lodash.each(state.libs, (arr, key) => {
            newLibs[key] =  lodash.filter(arr, (x) => {
                return x !== action.id;
            })
        })

        return lodash.assign({}, state, {
            display: newDisplay,
            libs: newLibs
        })
    }

    return state;
}

function Etalase(state) {
    const {item} = state;
    const {display, loading} = state.etalase;

    if (loading) {
        return {isLoading: true};
    }

    const items = lodash.chain(display)
        .map((id) => {
            return item[id];
        })
        .value()

    const categories = lodash.groupBy(items, (item) => {
        return item.category;
    })

    return {
        isDisplay: true,
        onDisplay: display,
        keyword: state.etalase.currentKeyword,
        items: lodash.map(categories, (catItem, keyword) => {
            return {
                category: keyword,
                items: catItem
            }
        })
    }
}

const etalaseUrl = config.backendUrl+"/etalase";

export function ChangeName(itemID, newName, category) {
    return (dispatch) => {
        return fetch(etalaseUrl, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemID, newName, category
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                return resp.json();
            }

            return null;
        })
        .then(function (resp) {
            if (resp) {
                if (newName === "") {
                    dispatch({
                        type: "items/delete",
                        id: itemID
                    })
                } else {
                    dispatch({
                        type: "items/update",
                        items: [{
                            id: itemID,
                            nama: newName
                        }]
                    })
                }
            }
        })
    }
}

export function Emphasis(realID) {
    return (dispatch, getState) => {
        const {etalase} = getState();
        dispatch({
            type: "etalase/customOrder",
            display: lodash.uniq([realID, ...etalase.display])
        })
    }
}

export function Query(keyword) {
    return (dispatch, getState) => {
        const state = getState();
        const {etalase} = state;
        const countState = CartSub('cart/count', state);

        if (keyword === "") {
            dispatch({
                type: "etalase/stopLoading"
            })

            return;
        }

        if (keyword in etalase.libs) {
            dispatch({
                type: "etalase/stopLoading"
            })

            dispatch({
                type: "etalase/showKey",
                keyword: keyword,
                countState: countState
            });

            return;
        }

        return fetch(etalaseUrl + "?item=" + keyword, {
            method: 'GET',
        })
        .then(function (results) {
            if (results.ok) {
                return results.json();
            }

            return {};
        })
        .then(function (resp) {
            dispatch({
                type: "items/update",
                items: resp.data
            })

            dispatch({
                type: "etalase/update",
                keyword: keyword,
                display: lodash.map(resp.data, (item) => {
                    return item.id
                }),
                countState: countState
            })

            dispatch({
                type: "etalase/stopLoading"
            })
        })
        .catch(() => {
            dispatch({
                type: "etalase/stopLoading"
            })
        });
    }
}

export const Sub = SubHelper({
    'etalase/etalase': Etalase
})
