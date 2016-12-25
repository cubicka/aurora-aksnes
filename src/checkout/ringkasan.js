import React from 'react'
import {connect} from 'react-redux'
import styles from './ringkasan.css'
import {FormatHarga} from '../helper/format'
import {Sub as CartSub} from '../reducer/cart'
import {TryConfirm} from '../reducer/checkout'

const Ringkasan = React.createClass({
    render() {
        const {total, TryConfirm} = this.props
        const kirim = 15000

        return (
            <div className={styles.ringkasanWrap}>
                <img src="cart.png" alt="" className={styles.logo} />
                <span className={styles.title}>Ringkasan Pembayaran</span>
                <span className={styles.itemWrap}>
                    <span className={styles.left}>Total Belanja</span>
                    <span className={styles.right}>
                        <span className={styles.rp}>Rp </span>
                        {FormatHarga(total)}
                    </span>
                </span>
                <span className={styles.itemWrap}>
                    <span className={styles.left}>Biaya Kirim</span>
                    <span className={styles.right}>
                        <span className={styles.rp}>Rp </span>
                        {FormatHarga(kirim)}
                    </span>
                </span>
                <span className={styles.separator} />
                <span className={styles.itemWrap2}>
                    <span className={styles.left}>Total Transaksi</span>
                    <span className={styles.right}>
                        <span className={styles.rp}>Rp </span>
                        {FormatHarga(total + kirim)}
                    </span>
                </span>
                <span className={styles.submitBtn} onClick={TryConfirm}>Konfirmasi Pesanan</span>
            </div>
        );
    }
})

function StateToProps(state) {
    const cart = CartSub('cart/cart', state)

    return {
        total: cart.total,
    }
}

function DisToProps(dispatch) {
    return {
        TryConfirm: () => {
            dispatch(TryConfirm())
        }
    }
}

export default connect(StateToProps, DisToProps)(Ringkasan)
