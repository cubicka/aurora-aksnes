import React from 'react'
import CartComponent from '../component/cart'
import EtalaseComponent from '../component/etalase'
import SignInComponent from '../component/signIn'
import HeaderComponent from '../component/header'

const Pages = React.createClass({
    render() {
        return (
            <div>
                <HeaderComponent />
                <CartComponent />
                <EtalaseComponent />
                <SignInComponent />
            </div>
        );
    }
})

export default Pages;
