import lodash from 'lodash'
import fetch from 'isomorphic-fetch'
import {push} from 'react-router-redux'
import config from '../config.json'

const orderUrl = config.backendUrl + '/order'

const initialState = {
    list: []
}

export default function Reducer(state = initialState, action) {
    switch(action.type) {
        case "order/editList": {
            return lodash.assign({}, state, {list: action.list})
        }

        default: return state;
    }
}

export function GetOrderList() {
    return (dispatch) => {
        return fetch(orderUrl, {
            method: 'get',
            credentials: 'include'
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then((result) => {
            dispatch({
                type: "order/editList",
                list: result.data
            })
        })
        .catch((err) => {
            dispatch(push('/'))
        })
    }
}
