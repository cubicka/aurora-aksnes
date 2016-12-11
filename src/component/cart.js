import lodash from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {Sub as CartSub} from '../reducer/cart'
// import Counter from './counter'
import style from './cart.css'
import CartRow from './cartRow'

// const CartItem = React.createClass({
//     render() {
//         const {id, nama, harga, ukuran, image, jumlah} = this.props;

//         return (
//             <div className={style.cartItem}>
//                 <img src={image} alt={nama} className={style.img} />
//                 <span className={style.counter}>
//                     <Counter id={id} />
//                     <div className={style.totalHarga}>Rp {harga * jumlah}</div>
//                 </span>
//                 <div>{nama}</div>
//                 <span>Rp {harga} / </span>
//                 <span>{ukuran}</span>
//                 <div style={{clear: 'both'}} />
//             </div>
//         );
//     }
// })

const Cart = React.createClass({
    hehe() {
        this.props.SortByHarga(this.props.cart)
    },
    render() {
        const {cart} = this.props;
        // const items = lodash.chain(cart)
        // .filter((item) => {
        //     return item.count > 0;
        // })
        // .map((item) => {
        //     return (
        //         <CartItem key={item.id} {...item.item} jumlah={item.count} />
        //     );
        // })
        // .value()

        const items = lodash.map(cart.items, (item) => {
            return <CartRow key={item.idx} activeIdx={cart.idx} {...item} />
        });

        const totalBro = lodash.reduce(cart.items, (acc, item) => {
            if (!item.price || !item.quantity) {
                return acc;
            }

            return acc + (parseInt(item.price, 10) * item.quantity);
        }, 0);

        return (
            <div className={style.cartWrapper}>
                <span className={style.beli}>Beli</span>
                <h3>Cart</h3>
                <h4>Total: Rp {totalBro}</h4>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th className={style.jumlah} onClick={this.props.SortByJumlah}>Jumlah</th>
                            <th onClick={this.props.SortByNama}>Nama</th>
                            <th className={style.harga} onClick={this.hehe}>Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
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
        }
    }
}

export default connect(StateToProps, DispatchToProps)(Cart);
