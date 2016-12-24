import fetch from 'isomorphic-fetch'
import config from '../config'
import lodash from 'lodash'

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
                type: "auth/hideSignIn",
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
                    me: resp.data
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
                type: "auth/hideSignIn",
            })
        })
        .catch(function () {
            alert('Sign in failed.');
        })
    }
}

const initialState = {
    modal: "",
    me: ""
}

function Reducer(state = initialState, action) {
    switch(action.type) {
        case "auth/showSignIn": {
            return lodash.assign({}, state, {modal: "signIn"})
        }

        case "auth/hideSignIn": {
            return lodash.assign({}, state, {modal: ""})
        }

        case "auth/showRegister": {
            return lodash.assign({}, state, {modal: "register"})
        }

        case "auth/showBeli": {
            return lodash.assign({}, state, {modal: "beli"})
        }

        case "auth/me": {
            return lodash.assign({}, state, {me: action.me})
        }

        default: return state;
    }
}

export default Reducer
