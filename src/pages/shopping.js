import React from 'react'
import CartComponent from '../component/cart'
import EtalaseComponent from '../component/etalase'
// import QueryComponent from '../component/query'

const Pages = React.createClass({
    render() {
        return (
            <div>
                <CartComponent />
                <EtalaseComponent />
            </div>
        );
    }
})

export default Pages;
