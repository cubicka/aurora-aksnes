import lodash from 'lodash'

const initialState = {};
const prevState = localStorage.item && JSON.parse(localStorage.item);

export default (state = prevState || initialState, action) => {
    if (action.type === "items/update") {
        let stateUpdate = {};

        lodash.each(action.items, (item) => {
            stateUpdate[item.id] = lodash.assign({}, state[item.id], item);
        })

        const syalala = lodash.assign({}, state, stateUpdate);
        localStorage.item = JSON.stringify(syalala);
        return syalala;
    }

    return state;
}
