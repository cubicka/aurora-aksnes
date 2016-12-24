import React from 'react'
import lodash from 'lodash'
import styles from './signIn.css'
import Optionx from './customOpt'
import {SubmitAddr} from '../reducer/auth'
import {connect} from 'react-redux'

const DeliveryConfirmation = React.createClass({
    getInitialState() {
        return {
            tgl: -1,
            jam: -1,
            nama: "",
            phone: "",
            alamat: "",
        }
    },
    getDates() {
        return lodash.map([1,2,3,4,5], (x) => {
            const now = new Date();
            now.setDate(now.getDate() + x);
            return now;
        })
    },
    formatDate(d) {
        return d.getDate().toString() + '/' + (d.getMonth() + 1).toString() + '/' + d.getFullYear().toString();
    },
    getDayName(d) {
        const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        return dayNames[d.getDay()];
    },
    selectTgl(x) {
        this.setState({tgl: x});
    },
    selectJam(x) {
        this.setState({jam: x});
    },
    trySubmit() {
        const {name, phone, alamat, jam, tgl} = this.state;
        if (!name) {
            alert('Nama Penerima nggak boleh kosong.')
        } else if (!phone) {
            alert('Nomor Handphone nggak boleh kosong.')
        } else if (!alamat) {
            alert('Mohon isi alamat dengan lengkap.');
        } else if (tgl < 0 || tgl > 4) {
            alert('Tanggal Pengiriman harus dipilih.');
        } else if (jam < 0 || jam > 3) {
            alert('Jam Pengiriman harus dipilih.')
        } else {
            this.props.SubmitAddr(name, phone, alamat, jam, tgl);
        }
    },
    insertTxt(keyword) {
        return (e) => {
            this.setState({[keyword]: e.target.value});
        }
    },
    render() {
        const {name, phone, alamat, tgl, jam} = this.state;
        const dates = this.getDates();
        const formattedDate = lodash.map(dates, this.formatDate)
        const formattedDay = lodash.map(dates, this.getDayName)
        const timeOpts = ['07:00 - 11:00', '11:00 - 15:00', '15:00 - 18:00', '18:00 - 20:00']

        return (
            <div className={styles.deliveryWrapper}>
                <img className={styles.closeDev} src="close.png" alt="" onClick={this.props.HideSignIn} />
                <span className={styles.titleDev}>Konfirmasi Pengiriman</span>
                <hr style={{marginTop: 20}} />
                <div className={styles.penerimaWrap}>
                    <span className={styles.labelNamaDev}>Nama Penerima</span>
                    <input className={styles.inputNamaDev} value={name} onChange={this.insertTxt('name')} />
                </div>
                <div className={styles.penerimaWrap + " " + styles.right}>
                    <span className={styles.labelNamaDev}>Nomor Handphone Penerima</span>
                    <input className={styles.inputNamaDev} value={phone} onChange={this.insertTxt('phone')} />
                </div>
                <div style={{clear: 'both'}} />
                <div className={styles.alamatWrap}>
                    <span className={styles.labelNamaDev}>Alamat Pengiriman</span>
                    <textarea className={styles.inputAlamatDev} placeholder="Masukkan alamat lengkap" value={alamat} onChange={this.insertTxt('alamat')} />
                </div>
                <div className={styles.alamatWrap}>
                    <span className={styles.labelNamaDev}>Tanggal Pengiriman</span>
                </div>
                <div className={styles.optionWrap}>
                    <Optionx selected={tgl === 0} name={'Besok'} value={formattedDate[0]} onClick={this.selectTgl.bind(null, 0)} />
                    <Optionx selected={tgl === 1} name={'Lusa'} value={formattedDate[1]} onClick={this.selectTgl.bind(null, 1)} />
                    <Optionx selected={tgl === 2} name={formattedDay[2]} value={formattedDate[2]} onClick={this.selectTgl.bind(null, 2)} />
                    <Optionx selected={tgl === 3} name={formattedDay[3]} value={formattedDate[3]} onClick={this.selectTgl.bind(null, 3)} />
                    <Optionx selected={tgl === 4} name={formattedDay[4]} value={formattedDate[4]} onClick={this.selectTgl.bind(null, 4)} />
                </div>
                <div style={{clear:'both'}} />
                <div className={styles.alamatWrap}>
                    <span className={styles.labelNamaDev}>Jam Pengiriman</span>
                </div>
                <div>
                    <Optionx selected={jam === 0} name={'Pagi'} value={timeOpts[0]} onClick={this.selectJam.bind(null, 0)} />
                    <Optionx selected={jam === 1} name={'Siang'} value={timeOpts[1]} onClick={this.selectJam.bind(null, 1)} />
                    <Optionx selected={jam === 2} name={'Sore'} value={timeOpts[2]} onClick={this.selectJam.bind(null, 2)} />
                    <Optionx selected={jam === 3} name={'Malam'} value={timeOpts[3]} onClick={this.selectJam.bind(null, 3)} />
                </div>
                <div style={{clear:'both'}} />
                <span className={styles.konfirmasiBtn} onClick={this.trySubmit}>Beli Barang</span>
            </div>
        );
    }
})

function DispatchToProps(dispatch) {
    return {
        SubmitAddr: (name, phone, address, jam, tgl) => {
            dispatch(SubmitAddr(name, phone, address, jam, tgl));
        }
    }
}

export default connect(undefined, DispatchToProps)(DeliveryConfirmation);
