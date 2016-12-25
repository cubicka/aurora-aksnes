import fetch from 'isomorphic-fetch'
import config from '../config'
import lodash from 'lodash'
import {push} from 'react-router-redux'

const authUrl = config.backendUrl + '/auth'

export function Register(username, password, email, phone) {
    return (dispatch) => {
        return fetch(authUrl + '/register', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                phone: phone
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                return resp.json();
            }

            throw new Error()
        })
        .then(function (resp) {
            alert('Success')
            dispatch({
                type: "auth/me",
                me: username
            })

            dispatch({
                type: "auth/nextModal",
            })
        })
        .catch(function (err) {
            alert('Fail')
        })
    }
}

export function GetMe() {
    return (dispatch) => {
        return fetch(authUrl + '/me', {
            method: 'get',
            credentials: 'include',
        })
        .then(function (resp) {
            if (resp.ok) {
                return resp.json();
            }

            return {};
        })
        .then(function (resp) {
            if (resp.data) {
                dispatch({
                    type: 'auth/me',
                    me: resp.data.me
                })
                dispatch({
                    type: 'checkout/editAlamat',
                    alamat: resp.data.address
                })
            }
        })
        .catch(function (err) {
        })
    }
}

export function Logout() {
    return (dispatch) => {
        return fetch(authUrl + '/logout', {
            method: 'get',
            credentials: 'include',
        })
        .then(function (resp) {
            if (resp.ok) {
                return resp.json();
            }

            return {};
        })
        .then(function (resp) {
            alert('Logout.');
            dispatch({
                type: 'auth/me',
                me: ''
            })
        })
        .catch(function (err) {
        })
    }
}

export function SignIn(username, password) {
    return (dispatch) => {
        return fetch(authUrl + '/signIn', {
            credentials: 'include',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                return resp.json();
            }

            throw new Error();
        })
        .then(function (resp) {
            alert('Sign in succeed.');
            dispatch({
                type: "auth/me",
                me: username
            })

            dispatch({
                type: "auth/nextModal",
            })
        })
        .catch(function () {
            alert('Sign in failed.');
        })
    }
}

export function SubmitAddr(name, phone, address, jam, tgl) {
    return (dispatch, getState) => {
        const {prev} = getState().auth;

        return fetch(authUrl + '/address', {
            credentials: 'include',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, phone, address, jam, tgl
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                return resp.json();
            }

            throw new Error();
        })
        .then(function (resp) {
            alert('Detail pengiriman telah disimpan.');
            if (prev !== "konfirmasi") {
                dispatch({
                    type: "auth/hideSignIn",
                })

                dispatch(push('/checkout'))
            } else {
                dispatch({
                    type: "auth/konfirmasi",
                })
            }
        })
        .catch(function () {
            alert('Network error.');
        })
    }
}

const initialState = {
    modal: "",
    me: "",
    prev: ""
}

function Reducer(state = initialState, action) {
    switch(action.type) {
        case "auth/showShadow": {
            return lodash.assign({}, state, {modal: "shadow"})
        }

        case "auth/showSignIn": {
            return lodash.assign({}, state, {modal: "signIn"})
        }

        case "auth/hideSignIn": {
            return lodash.assign({}, state, {modal: ""})
        }

        case "auth/showRegister": {
            return lodash.assign({}, state, {modal: "register"})
        }

        case "auth/nextModal": {
            if (state.prev) {
                return lodash.assign({}, state, {modal: "beli", prev: ""})
            } else {
                return lodash.assign({}, state, {modal: ""});
            }
        }

        case "auth/showBeli": {
            if (state.me) {
                return lodash.assign({}, state, {modal: "beli"})
            } else {
                return lodash.assign({}, state, {modal: "signIn", prev: "beli"});
            }
        }

        case "auth/konfirmasi": {
            return lodash.assign({}, state, {modal: "konfirmasi", prev: ""});
        }

        case "auth/fixDulu": {
            return lodash.assign({}, state, {modal: "beli", prev: "konfirmasi"});
        }

        case "auth/me": {
            return lodash.assign({}, state, {me: action.me})
        }

        default: return state;
    }
}

export default Reducer
