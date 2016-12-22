import React from 'react'
import styles from './signIn.css'
import {connect} from 'react-redux'

const SignIn = React.createClass({
    render() {
        return (
            <div>
                <img className={styles.closeBtn} src="close.png" alt="" onClick={this.props.HideSignIn} />
                <span className={styles.title}>Masuk ke Akun Anda</span>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Username</label>
                    <input />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Password</label>
                    <input type='password' />
                    <img className={styles.eye} src="eye.png" alt="" />
                </div>
                <span className={styles.signInBtn}>Masuk</span>
                <span className={styles.toRegister}>Belum punya akun? <span className={styles.registerLink} onClick={this.props.ToRegister}>Register disini</span></span>
            </div>
        );
    }
})

const Register = React.createClass({
    render() {
        return (
            <div>
                <img className={styles.closeBtn} src="close.png" alt="" onClick={this.props.HideSignIn} />
                <span className={styles.title}>Daftar Akun Baru</span>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Username</label>
                    <input />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Email</label>
                    <input />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Nomor Handphone</label>
                    <input />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Password</label>
                    <input type='password' />
                    <img className={styles.eye} src="eye.png" alt="" />
                </div>
                <span className={styles.signInBtn}>Daftar</span>
                <span className={styles.toRegister}>Sudah punya akun? <span className={styles.registerLink} onClick={this.props.ToSignIn}>Login disini</span></span>
            </div>
        );
    }
})

const Modal = React.createClass({
    render() {
        const {modal} = this.props;

        if (!modal) {
            return <div />
        }

        return (
            <div className={styles.wrapper}>
                <div className={styles.backdrop} />
                <div className={styles.modal}>
                {
                    modal === "signIn" ?
                    <SignIn {...this.props} /> :
                    <Register {...this.props} />
                }
                </div>
            </div>
        );
    }
})

function MapStateToProps(state) {
    const {modal} = state.auth;
    return {modal};
}

function DispatchToProps(dispatch) {
    return {
        HideSignIn: function () {
            dispatch({
                type: "auth/hideSignIn"
            })
        },
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

export default connect(MapStateToProps, DispatchToProps)(Modal)
