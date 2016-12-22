import fetch from 'isomorphic-fetch'
import config from '../config'

const authUrl = config.backendUrl + '/auth'

export function Register(username, password) {
    return fetch(authUrl + '/register', {
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

        return {};
    })
    .then(function (resp) {
        if (!resp || !resp.data || !resp.data.message || resp.data.message !== 'success') {
            alert('Registration failed.');
        } else {
            alert('Registration succeed.');
        }
    })
}

export function SignIn(username, password) {
    return fetch(authUrl + '/signIn', {
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

        return {};
    })
    .then(function (resp) {
        console.log('rr', resp);
        if (!resp || !resp.data || !resp.data.message || resp.data.message !== 'success') {
            alert('Sign In failed.');
        } else {
            alert('Sign In succeed.');
        }
    })
}

const initialState = {
    modal: ""
}

function Reducer(state = initialState, action) {
    switch(action.type) {
        case "auth/showSignIn": {
            return {modal: "signIn"}
        }

        case "auth/hideSignIn": {
            return {modal: ""}
        }

        case "auth/showRegister": {
            return {modal: "register"}
        }

        default: return state;
    }
}

export default Reducer
