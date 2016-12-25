import lodash from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {Sub as CartSub} from '../reducer/cart'
import styles from './detil.css'
import {FormatHarga} from '../helper/format'

const Pagination = React.createClass({
    render() {
        const {current, total, next, prev} = this.props

        return (
            <div className={styles.paginationWrap}>
                <span className={styles.pagePrev} onClick={prev}>{"<"}</span>
                <span className={styles.pageNotes}>{current} / {total}</span>
                <span className={styles.pageNext} onClick={next} >{">"}</span>
            </div>
        );
    }
})

class RingkasanBelanja extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1
        };
    }
    next() {
        const npage = parseInt(Math.ceil(this.props.cart.items.length / 10), 10);
        this.setState({
            current: Math.min(this.state.current + 1, npage)
        })
    }
    prev() {
        this.setState({
            current: Math.max(1, this.state.current - 1)
        })
    }
    componentWillReceiveProps(nextProps) {
        const npage = parseInt(Math.ceil(nextProps.cart.items.length / 10), 10);
        const {current} = this.state;
        if (current > npage) {
            this.setState({
                current: Math.max(1, npage)
            })
        }
    }
    tryDel(item, idx) {
        if (confirm('Anda yakin ingin menghapus ' + item.nama)) {
            this.props.Delete(idx)
        }
    }
    render() {
        const {cart, inc, dec, colls} = this.props;
        const npage = parseInt(Math.ceil(cart.items.length / 10), 10);
        const current = (this.state && this.state.current) || 1;
        const items = lodash.map(cart.items.slice(10*(current-1),10*current), (item, idx) => {
            const q = parseInt(item.quantity, 10) || 0;

            return (
                <div className={styles.cartItem} key={idx}>
                    <span className={styles.rowNama}>{item.nama}</span>
                    <span className={styles.rowCat}>{item.ukuran}</span>
                    <span className={styles.rowQ}>
                        <span className={styles.minus} onClick={dec.bind(null,colls[item.realID])}>-</span>
                        {q}
                        <span className={styles.plus} onClick={inc.bind(null,colls[item.realID])}>+</span>
                    </span>
                    <span className={styles.rowP}>
                        Rp {FormatHarga(q * item.price)}
                    </span>
                    <span className={styles.rowD}>
                        <span className={styles.del} onClick={this.tryDel.bind(this, colls[item.realID], item.idx)}>x</span>
                    </span>
                </div>
            );
        })

        return (
            <div className={styles.panelWrap}>
                <div className={styles.panel}>
                    <span className={styles.panelTitle}>Ringkasan Belanja</span>
                    <Pagination current={current} total={npage} next={this.next.bind(this)} prev={this.prev.bind(this)} />
                </div>
                <div className={styles.whitePan}>
                    <div className={styles.cartItem2}>
                        <span className={styles.rowNama}>Nama</span>
                        <span className={styles.rowCat}>Keterangan</span>
                        <span className={styles.rowQ}>Jumlah</span>
                        <span className={styles.rowP}>Harga</span>
                        <span className={styles.rowD}>
                        </span>
                    </div>
                    <span className={styles.separator}></span>
                    <div className={styles.itemWrap}>
                        {items}
                    </div>
                </div>
                <div className={styles.panel2}>
                    <span className={styles.panelTitle} style={{paddingLeft: 10}}>Total Belanja</span>
                    <span className={styles.panelRight}>Rp {FormatHarga(cart.total)}</span>
                </div>
            </div>
        );
    }
}

const Pembayaran = React.createClass({
    changeBayar(e) {
        const {edit} = this.props;
        const s = parseInt(e.target.value, 10) || 0;

        edit(s)
    },
    render() {
        const {checkout} = this.props;

        return (
            <div className={styles.panelWrap}>
                <div className={styles.panel}>
                    <span className={styles.panelTitle}>Jenis Pembayaran</span>
                </div>
                <div className={styles.whitePan} style={{padding: 22}}>
                    <div style={{fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>Tunai</div>
                    <div style={{lineHeight: '30px'}}>Pembayaran dilakukan secara tunai.</div>
                    <div>Tulis jumlah uang yang Anda gunakan untuk membayar</div>
                    <span className={styles.bayarWrap}>
                        <span className={styles.rp}>Rp</span>
                        <input className={styles.inputBayar} value={checkout.uang} onChange={this.changeBayar} />
                    </span>
                </div>
            </div>
        );
    }
})

const Pengiriman = React.createClass({
    getDayofDate(d) {
        const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        return `${day[d.getDay() + 1]}, ${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()}`;
    },
    getJam(x) {
        const timeOpts = ['Pagi 07:00 - 11:00', 'Siang 11:00 - 15:00', 'Sore 15:00 - 18:00', 'Malam 18:00 - 20:00']

        return timeOpts[x]
    },
    render() {
        const {name, phone, address, tgl, jam, now} = this.props;
        let d = new Date(now);
        d.setDate(d.getDate() + tgl);

        return (
            <div className={styles.panelWrap}>
                <div className={styles.panel}>
                    <span className={styles.panelTitle}>Detail Pengiriman</span>
                    <span className={styles.ubah} style={{float: 'right', cursor: 'pointer'}} onClick={this.props.EditAlamat}>
                        <img src="/ubah.png" alt="" className={styles.ubah} 
                            style={{position: 'relative', left: -4, top: 4}} />
                        Ubah
                    </span>
                </div>
                <div className={styles.whitePan} style={{padding: 20}}>
                    <div className={styles.twoWrap}>
                        <div>
                            <span className={styles.label}>Nama Penerima</span>
                            <span className={styles.valueBig}>{name}</span>
                        </div>
                        <div>
                            <span className={styles.label}>Nomor Handphone Penerima</span>
                            <span className={styles.valueBig}>{phone}</span>
                        </div>
                    </div>
                    <span className={styles.label} style={{marginTop: 30}}>Alamat</span>
                    <span className={styles.valueS} style={{marginBottom: 30, display: 'block'}}>{address}</span>
                    <div className={styles.twoWrap}>
                        <div>
                            <span className={styles.label}>Tanggal Pengiriman</span>
                            <span className={styles.valueBig}>{this.getDayofDate(d)}</span>
                        </div>
                        <div>
                            <span className={styles.label}>Jam Pengiriman</span>
                            <span className={styles.valueBig}>{this.getJam(jam)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})

const Summary = React.createClass({
    render() {
        const {cart, Inc, Dec, item, TryDelete, checkout, EditUang, pengiriman, EditAlamat} = this.props;
        return (
            <div className={styles.base}>
                <span className={styles.title}>Konfirmasi Pesanan</span>
                <RingkasanBelanja cart={cart} inc={Inc} dec={Dec} colls={item} Delete={TryDelete} />
                <Pembayaran checkout={checkout} edit={EditUang} />
                <Pengiriman {...pengiriman} EditAlamat={EditAlamat} />
            </div>
        );
    }
})

function StateToProps(state) {
    const cart = CartSub('cart/cart', state);
    const cart2 = lodash.assign({}, cart, {
        items: lodash.chain(cart.items)
            .filter((item) => {
                return item.nama !== item.keyword && item.quantity > 0
            })
            .sortBy((item) => (item.nama))
            .value()
    })

    return {
        cart: cart2, item: state.item,
        checkout: state.checkout,
        pengiriman: state.checkout.alamat
    }
}

function DisToProps(dispatch) {
    return {
        Inc: (item) => {
            dispatch({
                type: "cart/inc",
                itemID: item.id,
                keyword: item.category,
                item: item
            })
        },
        Dec: (item) => {
            dispatch({
                type: "cart/dec",
                itemID: item.id,
                keyword: item.category,
                item: item
            })
        },
        TryDelete: (idx) => {
            dispatch({
                type: "cart/delete",
                idx: idx
            })
        },
        EditUang: (uang) => {
            dispatch({
                type: "checkout/editUang",
                uang,
            })
        },
        EditAlamat: () => {
            dispatch({
                type: "auth/showBeli"
            })
        }
    }
}

export default connect(StateToProps, DisToProps)(Summary)
