import React from 'react'
import {connect} from 'react-redux'
import style from './etalase.css'

const EtalaseItem = React.createClass({
    inc() {
        this.props.Inc();
    },
    dec() {
        this.props.Dec();
    },
    onChange() {

    },
    render() {
        const {nama, harga, ukuran, image, count} = this.props;
        const namakelas = count > 0 ? style.show + " " + style.selected : style.selected;

        return (
            <div className={style.item}>
                <div className={namakelas} />
                <img className={style.img} src={image} alt={nama} />
                <span>{nama}</span>
                <span className={style.harga}><strong>{harga}</strong> / {ukuran}</span>
                <div className={style.counter}>
                    <div className={style.minus} onClick={this.dec}>-</div>
                    <div className={style.plus} onClick={this.inc}>+</div>
                    <input className={style.input} value={count} onChange={this.onChange} />
                </div>
            </div>
        );
    }
})

function DispatchToProps(dispatch, ownProps) {
    return {
        Inc: () => {
            dispatch({
                type: "cart/inc",
                itemID: ownProps.id,
                keyword: ownProps.keyword,
                item: ownProps
            })
        },
        Dec: () => {
            dispatch({
                type: "cart/dec",
                itemID: ownProps.id,
                keyword: ownProps.keyword,
                item: ownProps
            })
        }
    }
}

export default connect(undefined, DispatchToProps)(EtalaseItem);
