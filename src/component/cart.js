import lodash from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {Sub as CartSub, FilterCart} from '../reducer/cart'
import style from './cart.css'
import CartRow from './cartRow'

const Cart = React.createClass({
    getInitialState() {
        return {
            isFiltering: false
        }
    },
    openFiltering() {
        this.setState({
            isFiltering: true
        })
        this.filterInput.focus();
    },
    closeFiltering() {
        if (this.props.filterKey !== "") {
            this.setState({
                isFiltering: false
            })
        }
    },
    changeFilter(e) {
        this.props.ChangeFilter(e.target.value);
        this.setState({
            isFiltering: true
        })
    },
    hehe() {
        this.props.SortByHarga(this.props.cart)
    },
    render() {
        const {cart} = this.props;
        const {filterKey} = cart;

        const items = lodash.map(cart.items, (item, urutan) => {
            return <CartRow key={item.idx} activeIdx={cart.idx} {...item} placehold={urutan === cart.items.length-1} />
        });

        const totalBro = lodash.reduce(cart.items, (acc, item) => {
            if (!item.price || !item.quantity) {
                return acc;
            }

            return acc + (parseInt(item.price, 10) * item.quantity);
        }, 0);

        const filteringClass = this.state.isFiltering || (filterKey !== "") ? (style.filterWrapper + " " + style.isFiltering) : style.filterWrapper;

        return (
            <div className={style.cartWrapper}>
                <span className={style.totalWrapper}>
                    Total  <span className={style.totalAmount}>Rp {totalBro}</span>
                </span>
                <span className={style.controlWrapper}>
                    <img src="undo.png" alt="" className={style.undo} onClick={this.props.Undo} />
                    <img src="redo.png" alt="" className={style.redo} onClick={this.props.Redo} />
                </span>
                <span className={style.cartTitle}>My Cart</span>
                <span className={filteringClass}>
                    <input className={style.cartFilter} 
                        ref={(input) => { this.filterInput = input; }} onBlur={this.closeFiltering} value={filterKey} onChange={this.changeFilter} />
                    <span className={style.cartFilterIcon} onClick={this.openFiltering} />
                </span>
                <span className={style.headerWrapper}>
                    <span className={style.headerNama} onClick={this.props.SortByNama}>Nama</span>
                    <span className={style.headerJumlah} onClick={this.props.SortByJumlah}>Jumlah</span>
                    <span className={style.headerHarga} onClick={this.hehe}>Harga</span>
                </span>
                <table className={style.table}>
                    <tbody>
                        {items}
                    </tbody>
                </table>
                <span className={style.submitWrapper}>
                    <span className={style.submitTotal}>Total</span>
                    <span className={style.submitAmount}>Rp {totalBro}</span>
                    <span className={style.submitBtn} onClick={this.props.ShowBeli}>Beli</span>
                </span>
            </div>
        );
    }
})

const StateToProps = (state) => {
    return {
        cart: CartSub('cart/cart', state)
    }
}

const DispatchToProps = (dispatch, ownProps) => {
    return {
        Undo: () => {
            dispatch({
                type: "cart/undo"
            })
        },
        Redo: () => {
            dispatch({
                type: "cart/redo"
            })
        },
        ShowBeli: () => {
            dispatch({
                type: "auth/showBeli"
            })
        },
        ShowSignIn: () => {
            dispatch({
                type: "auth/showSignIn"
            })
        },
        SortByJumlah: () => {
            dispatch({
                type: "cart/sort",
                sortID: 0,
            })
        },
        SortByNama: () => {
            dispatch({
                type: "cart/sort",
                sortID: 1
            })
        },
        SortByHarga: (hahaha) => {
            dispatch({
                type: "cart/sort",
                sortID: 2,
                itemColls: hahaha
            })
        },
        ChangeFilter: (txt) => {
            dispatch(FilterCart(txt));
        }
    }
}

export default connect(StateToProps, DispatchToProps)(Cart);
