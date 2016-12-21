import React from 'react'
import styles from './signIn.css'
import {connect} from 'react-redux'

const SignIn = React.createClass({
	render() {
		const {showSignIn} = this.props;

		if (!showSignIn) {
			return <div />
		}

		return (
			<div className={styles.wrapper}>
				<div className={styles.backdrop} />
				<div className={styles.modal}>
					<span className={styles.title}>Masuk ke Akun Anda</span>
					<div className={styles.inputWrapper}>
						<label className={styles.inputLabel}>Username</label>
						<input />
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.inputLabel}>Password</label>
						<input type='password' />
					</div>
					<span className={styles.signInBtn} onClick={this.props.HideSignIn}>Masuk</span>
					<span className={styles.toRegister}>Belum punya akun? <span className={styles.registerLink}>Register disini</span></span>
				</div>
			</div>
		);
	}
})

function MapStateToProps(state) {
	const showSignIn = state.auth.showSignIn;
	return {showSignIn};
}

function DispatchToProps(dispatch) {
	return {
		HideSignIn: function () {
			dispatch({
				type: "auth/hideSignIn"
			})
		}
	}
}

export default connect(MapStateToProps, DispatchToProps)(SignIn)
