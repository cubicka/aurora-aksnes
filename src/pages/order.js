import React from 'react'
import HeaderComponent from '../component/header'
import SignInComponent from '../component/signIn'
import OrderList from '../order'

const OrderPage = React.createClass({
    render() {
        return (
            <div>
                <SignInComponent />
                <HeaderComponent />
                <OrderList />
            </div>
        );
    }
})

export default OrderPage
