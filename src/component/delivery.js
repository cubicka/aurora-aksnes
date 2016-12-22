import React from 'react'
import styles from './signIn.css'

const DeliveryConfirmation = React.createClass({
    render() {
        return (
            <div className={styles.deliveryWrapper}>
                <img className={styles.closeDev} src="close.png" alt="" onClick={this.props.HideSignIn} />
                <span className={styles.titleDev}>Beli</span>
                <hr style={{marginTop: 20}} />
                <div className={styles.penerimaWrap}>
                    <span className={styles.labelNamaDev}>Nama Penerima</span>
                    <input className={styles.inputNamaDev} />
                </div>
                <div className={styles.penerimaWrap + " " + styles.right}>
                    <span className={styles.labelNamaDev}>Nomor Handphone Penerima</span>
                    <input className={styles.inputNamaDev} />
                </div>
                <div style={{clear: 'both'}} />
                <div className={styles.alamatWrap}>
                    <span className={styles.labelNamaDev}>Alamat</span>
                    <textarea className={styles.inputAlamatDev} placeholder="Masukkan alamat lengkap" />
                </div>
                <div className={styles.alamatWrap}>
                    <span className={styles.labelNamaDev}>Tanggal Pengiriman</span>
                </div>
                <div className={styles.alamatWrap}>
                    <span className={styles.labelNamaDev}>Jam Pengiriman</span>
                </div>
                <span className={styles.konfirmasiBtn}>Beli Barang</span>
            </div>
        );
    }
})

export default DeliveryConfirmation;
