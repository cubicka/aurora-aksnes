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
					<h5 className={styles.title}>Sign In</h5>
					<div className={styles.inputWrapper}>
						<label>Username</label>
						<input />
					</div>
					<div className={styles.inputWrapper}>
						<label>Password</label>
						<input type='password' />
					</div>
					<span className={styles.signInBtn} onClick={this.props.HideSignIn}>Sign In</span>
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
