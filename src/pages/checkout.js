import React from 'react'
import {connect} from 'react-redux'
import SignInComponent from '../component/signIn'
import HeaderComponent from '../component/header'
import CheckoutBase from '../checkout'
import {StartCheckout} from '../reducer/checkout'

const Checkout = React.createClass({
    componentDidMount() {
        this.props.StartCheckout()
    },
    render() {
        const path = this.props.routes[0].path
        return (
            <div>
                <SignInComponent />
                <HeaderComponent path={path} />
                <CheckoutBase />
            </div>
        );
    }
})

function DisToProps(dispatch) {
    return {
        StartCheckout: () => {
            dispatch(StartCheckout())
        }
    }
}

export default connect(undefined, DisToProps)(Checkout)
