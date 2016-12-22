import React from 'react'
import {connect} from 'react-redux'
import style from './header.css'

const Header = React.createClass({
    render() {
        return (
            <div className={style.header}>
                <span className={style.authWrapper}>
                    <span className={style.login} onClick={this.props.ToSignIn}>Log In</span>
                    <span className={style.signIn} onClick={this.props.ToRegister}>Sign Up</span>
                </span>
                <input className={style.search} placeholder="Mencari sesuatu ..?" />
            </div>
        );
    }
})

function DispatchToProps(dispatch) {
    return {
        ToRegister: () => {
            dispatch({
                type: "auth/showRegister"
            })
        },
        ToSignIn: () => {
            dispatch({
                type: "auth/showSignIn"
            })
        }
    }
}

export default connect(undefined, DispatchToProps)(Header)
