import React from 'react'
import {connect} from 'react-redux'
import {Sub as CartSub, UpdateKeyword} from '../reducer/cart'
import style from './header.css'

const Header = React.createClass({
    changeSearch(e) {
        const text = e.target.value;
        const {cart, lastCart, query} = this.props;

        if (text === "") {
            this.props.TryDelete(lastCart.idx);
        } else if (query !== "") {
            this.props.UpdateKeyword(lastCart.idx, text);
        } else if (text !== "") {
            this.props.UpdateKeyword(cart.items[cart.cartItem[cart.cartItem.length-1]].idx, text);
        }
    },
    render() {
        const {query} = this.props;

        return (
            <div className={style.header}>
                <span className={style.authWrapper}>
                    <span className={style.login} onClick={this.props.ToSignIn}>Log In</span>
                    <span className={style.signIn} onClick={this.props.ToRegister}>Sign Up</span>
                </span>
                <input className={style.search} placeholder="Mencari sesuatu ..?" value={query} onChange={this.changeSearch} />
            </div>
        );
    }
})

function StateToProps(state) {
    const cart = CartSub('cart/cart', state)
    const lastCart = cart.items.length > 1 ? cart.items[cart.items.length - 2] : {};
    const query = lastCart.keyword === lastCart.nama && lastCart.nama ? lastCart.nama : "";

    return {
        cart: cart,
        lastCart, query,
    }
}

function DispatchToProps(dispatch, ownProps) {
    return {
        TryDelete: (idx) => {
            dispatch({
                type: "cart/delete",
                idx: idx
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
        UpdateKeyword: (idx, text) => {
            dispatch(UpdateKeyword(idx, text));
        }
    }
}

export default connect(StateToProps, DispatchToProps)(Header)
