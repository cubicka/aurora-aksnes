import React from 'react'
import CartComponent from '../component/cart'
import EtalaseComponent from '../component/etalase'
import SignInComponent from '../component/signIn'

const Pages = React.createClass({
    render() {
        return (
            <div>
                <CartComponent />
                <EtalaseComponent />
                <SignInComponent />
            </div>
        );
    }
})

export default Pages;
