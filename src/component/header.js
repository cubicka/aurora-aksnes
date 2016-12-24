import React from 'react'
import {connect} from 'react-redux'
import {Sub as CartSub, UpdateKeyword} from '../reducer/cart'
import {GetMe, Logout} from '../reducer/auth'
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
            this.props.UpdateKeyword(cart.items[cart.items.length-1].idx, text);
        }
    },
    componentDidMount() {
        this.props.GetMe();
    },
    render() {
        const {query, me} = this.props;

        return (
            <div className={style.header}>
                {
                    !me &&
                    <span className={style.authWrapper}>
                        <span className={style.login} onClick={this.props.ToSignIn}>Log In</span>
                        <span className={style.signIn} onClick={this.props.ToRegister}>Sign Up</span>
                    </span>
                }
                {
                    me &&
                    <span className={style.authWrapper}>
                        <span className={style.login}>Hi {me}</span>
                        <span className={style.signIn} onClick={this.props.Logout}>Logout</span>
                    </span>
                }
                <input className={style.search} placeholder="Mencari sesuatu ..?" value={query} onChange={this.changeSearch} />
            </div>
        );
    }
})

function StateToProps(state) {
    const cart = CartSub('cart/cart', state)
    const lastCart = cart.items.length > 1 ? cart.items[cart.items.length - 2] : {};
    const query = lastCart.keyword === lastCart.nama && lastCart.nama ? lastCart.nama : "";

    const {me} = state.auth

    return {
        cart: cart,
        lastCart, query,
        me,
    }
}

function DispatchToProps(dispatch, ownProps) {
    return {
        GetMe: () => {
            dispatch(GetMe())
        },
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
        },
        Logout: () => {
            dispatch(Logout());
        }
    }
}

export default connect(StateToProps, DispatchToProps)(Header)
