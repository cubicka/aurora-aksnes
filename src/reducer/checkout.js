import lodash from 'lodash'
import {push} from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import config from '../config.json'

const authUrl = config.backendUrl + '/auth'
const initialState = {
    uang: 0,
    alamat: {}
}

function SaveToComp(state) {
    localStorage.checkout = JSON.stringify(state);
    return state;
}

// const prevState = localStorage.checkout || initialState;
const prevState = initialState;
function Reducer(state = prevState, action) {
    switch(action.type) {
        case "checkout/editUang": {
            const syalala = lodash.assign({}, state, {uang: action.uang})
            return SaveToComp(syalala)
        }

        case "checkout/editAlamat": {
            const syalala = lodash.assign({}, state, {alamat: action.alamat})
            return SaveToComp(syalala)
        }

        default: return state;
    }
}

export default Reducer

export function StartCheckout() {
    return (dispatch) => {
        dispatch({
            type: "auth/showShadow"
        })

        return fetch(authUrl + '/address', {
            method: 'get',
            credentials: 'include'
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }

            throw new Error()
        })
        .then(function (result) {
            dispatch({
                type: "checkout/editAlamat",
                alamat: result.data
            })

            dispatch({
                type: "auth/hideSignIn"
            })
        })
        .catch(function () {
            dispatch({
                type: "auth/hideSignIn"
            })
            dispatch(push('/'))
        })
    }
}

export function TryConfirm() {
    return (dispatch, getState) => {
        const {checkout} = getState();
        const {alamat} = checkout;

        let d = new Date(alamat.now);
        d.setDate(d.getDate() + 1);

        let x = new Date();
        const tgl = d.getDate() - x.getDate() - 1;

        if (tgl < 0) {
            dispatch({
                type: "auth/fixDulu"
            })
        } else {
            dispatch({
                type: "auth/konfirmasi"
            })
        }
    }
}

export function Konfirmasi() {
    return (dispatch, getState) => {
        const {checkout, cart} = getState();
        const selectedItems = lodash.chain(cart.cartItem)
            .map((id) => (cart.items[id]))
            .filter((item) => (item.keyword !== item.nama && item.quantity))
            .map((item) => {
                return {id: item.realID, q: item.quantity}
            })
            .value()

        return fetch(authUrl + '/konfirmasi', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart: selectedItems, uang: checkout.uang
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }

            throw new Error()
        })
        .then((result) => {
            alert('Terima kasih. Pesanan telah diterima.')
            dispatch({
                type: "cart/clear"
            })

            dispatch({
                type: "auth/hideSignIn"
            })

            dispatch(push('/'))
        })
        .catch((err) => {
            alert('Konfirmasi pesanan gagal');
        })
    }
}
