import React from 'react'
import CartComponent from '../component/cart'
import EtalaseComponent from '../component/etalase'
import SignInComponent from '../component/signIn'
import HeaderComponent from '../component/header'

const Pages = React.createClass({
    render() {
        const path = this.props.routes[0].path
        return (
            <div>
                <HeaderComponent path={path} />
                <CartComponent />
                <EtalaseComponent />
                <SignInComponent />
            </div>
        );
    }
})

export default Pages;
