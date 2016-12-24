import React from 'react'
import styles from './signIn.css'
import {connect} from 'react-redux'
import Delivery from './delivery'
import {Register, SignIn} from '../reducer/auth'

const SignInX = React.createClass({
    getInitialState() {
        return {
            username: "", password: "",
        }
    },
    changeText(keyword) {
        return (e) => {
            this.setState({
                [keyword]: e.target.value
            })
        }
    },
    checkEnter(e) {
        if (e.keyCode === 13) {
            this.signIn();
        }
    },
    signIn() {
        const {username, password} = this.state;
        if (username && password) {
            this.props.SignIn(username, password);
        } else if (!username) {
            alert('Username nggak boleh kosong');
        } else if (!password) {
            alert('Password nggak boleh kosong');
        }
    },
    render() {
        const {username, password} = this.state;
        return (
            <div>
                <img className={styles.closeBtn} src="close.png" alt="" onClick={this.props.HideSignIn} />
                <span className={styles.title}>Masuk ke Akun Anda</span>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Username</label>
                    <input value={username} onChange={this.changeText('username')} onKeyDown={this.checkEnter} />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Password</label>
                    <input type="password" value={password} onChange={this.changeText('password')} onKeyDown={this.checkEnter} />
                    <img className={styles.eye} src="eye.png" alt="" />
                </div>
                <span className={styles.signInBtn} onClick={this.signIn}>Masuk</span>
                <span className={styles.toRegister}>Belum punya akun? <span className={styles.registerLink} onClick={this.props.ToRegister}>Register disini</span></span>
            </div>
        );
    }
})

const RegisterX = React.createClass({
    getInitialState() {
        return {
            username: "", password: "",
            email: "", phone: ""
        }
    },
    changeText(keyword) {
        return (e) => {
            this.setState({
                [keyword]: e.target.value
            })
        }
    },
    setPhone(e) {
    },
    register() {
        const {username, password, email, phone} = this.state;
        if (username && password && email && phone) {
            this.props.Register(username, password, email, phone);
        } else if (!username) {
            alert('Username nggak boleh kosong');
        } else if (!email) {
            alert('Email nggak boleh kosong');
        } else if (!phone) {
            alert('Phone nggak boleh kosong');
        } else if (!password) {
            alert('Password nggak boleh kosong');
        }
    },
    checkEnter(e) {
        if (e.keyCode === 13) {
            this.register();
        }
    },
    render() {
        const {username, password, email, phone} = this.state;

        return (
            <div>
                <img className={styles.closeBtn} src="close.png" alt="" onClick={this.props.HideSignIn} />
                <span className={styles.title}>Daftar Akun Baru</span>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Username</label>
                    <input value={username} onChange={this.changeText('username')} onKeyDown={this.checkEnter} />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Email</label>
                    <input value={email} onChange={this.changeText('email')} onKeyDown={this.checkEnter} />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Nomor Handphone</label>
                    <input value={phone} onChange={this.changeText('phone')} onKeyDown={this.checkEnter} />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Password</label>
                    <input type="password" value={password} onChange={this.changeText('password')} onKeyDown={this.checkEnter} />
                    <img className={styles.eye} src="eye.png" alt="" />
                </div>
                <span className={styles.signInBtn} onClick={this.register}>Daftar</span>
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
                <div className={modal === "beli" ? styles.modal2 : styles.modal}>
                {
                    modal === "signIn" &&
                    <SignInX {...this.props} />
                }
                {
                    modal === "register" &&
                    <RegisterX {...this.props} />
                }
                {
                    modal === "beli" &&
                    <Delivery {...this.props} />
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
        },
        Register: (username, password, email, phone) => {
            dispatch(Register(username, password, email, phone))
        },
        SignIn: (user, pass) => {
            dispatch(SignIn(user, pass))
        }
    }
}

export default connect(MapStateToProps, DispatchToProps)(Modal)
