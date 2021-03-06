import React from 'react'
import {connect} from 'react-redux'
import style from './etalase.css'
import {ChangeName} from '../reducer/etalase'
import {UpdateQuantityByID} from '../reducer/cart'
import {FormatHarga} from '../helper/format'

const EtalaseItem = React.createClass({
    getInitialState() {
        return {
            editMode: false,
            newName: this.props.nama
        }
    },
    toEditMode() {
        this.setState({
            editMode: true
        })
    },
    editName(e) {
        this.setState({
            newName: e.target.value
        })
    },
    componentDidUpdate(prevProps, prevState) {
        if (prevState.editMode !== this.state.editMode && this.state.editMode) {
            this.editText.focus();
        }
    },
    toBlur() {
        this.setState({
            editMode: false,
            newName: this.props.nama
        })
    },
    trySubmit(e) {
        if (e.keyCode === 13) {
            this.props.ChangeName(this.props.id, this.state.newName, this.props.category);
            this.setState({
                editMode: false
            })
        }
    },
    hapus() {
            this.props.ChangeName(this.props.id, '', this.props.category);
    },
    inc() {
        this.props.Inc();
    },
    dec() {
        this.props.Dec();
    },
    onChange(e) {
        const q = parseInt(e.target.value, 10);
        this.props.UpdateQuantity(q || 0);
    },
    render() {
        const {name: nama, harga, ukuran, image, count} = this.props;
        // console.log('p', this.props)
        const namakelas = count > 0 ? style.item + " " + style.selected : style.item;

        return (
            <div className={namakelas}>
                <div style={{position: 'relative'}}>
                    <img className={style.img} src={image} alt={nama} />
                    {
                        this.state.editMode ? 
                        <input onBlur={this.toBlur} value={this.state.newName} onChange={this.editName} onKeyDown={this.trySubmit} ref={(input) => { this.editText = input; }} /> :
                        <span className={style.itemName} onClick={this.toEditMode}>{nama}</span>
                    }
                    </div>
                <span className={style.harga} onClick={this.toEditMode}><strong>Rp {FormatHarga(harga)}</strong> / {ukuran}</span>
                <div className={style.counter}>
                    <div className={style.minus} onClick={this.dec}>-</div>
                    <div className={style.plus} onClick={this.inc}>+</div>
                    <input className={style.input} value={count} onChange={this.onChange} />
                </div>
                {

                //<span className={style.delete} onClick={this.hapus} />
                }
            </div>
        );
    }
})

function DispatchToProps(dispatch, ownProps) {
    return {
        hapus: (itemID, newName, category) => {
            dispatch(ChangeName(itemID, '', category));
        },
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
        },
        ChangeName: (itemID, newName, category) => {
            dispatch(ChangeName(itemID, newName, category));
        },
        UpdateQuantity: (quantity) => {
            dispatch({
                type: "cart/inc",
                itemID: ownProps.id,
                keyword: ownProps.keyword,
                item: ownProps
            })
            dispatch(UpdateQuantityByID(ownProps.id, quantity+1, ownProps))
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
