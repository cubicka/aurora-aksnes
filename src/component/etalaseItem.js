import React from 'react'
import {connect} from 'react-redux'
import style from './etalase.css'
import {ChangeName} from '../reducer/etalase'

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
    trySubmit(e) {
        if (e.keyCode === 13) {
            this.props.ChangeName(this.props.id, this.state.newName, this.props.category);
            this.setState({
                editMode: false
            })
        }
    },
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
                {
                    this.state.editMode ? 
                    <input value={this.state.newName} onChange={this.editName} onKeyDown={this.trySubmit} ref={(input) => { this.editText = input; }} /> :
                    <span onClick={this.toEditMode}>{nama}</span>
                }
                <span className={style.harga} onClick={this.toEditMode}><strong>{harga}</strong> / {ukuran}</span>
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
        },
        ChangeName: (itemID, newName, category) => {
            dispatch(ChangeName(itemID, newName, category));
        }
    }
}

export default connect(undefined, DispatchToProps)(EtalaseItem);
