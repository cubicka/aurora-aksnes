import React from 'react';
import lodash from 'lodash'
import {connect} from 'react-redux';
import {UpdateText, TotalHarga, ItemList} from '../reducers/item';

const Please = React.createClass({
    render() {
        const style = {
            backgroundColor: "#c33",
            color: "#fff",
            margin: "0 15px",
            minHeight: 30,
            padding: 10,
            // borderRadius: 5,
            textAlign: 'left',
            textIndent: 0,
            fontSize: 14,
            lineHeight: "28px",
            position: "relative",
            border: "solid 1px #333",
            borderBottom: "none"
        }

        const bdtop = {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: "#c33",
            color: "#fff",
            margin: "0 15px",
            minHeight: 30,
            padding: 10,
            // borderRadius: 5,
            textAlign: 'left',
            textIndent: 0,
            fontSize: 14,
            lineHeight: "15px",
            position: "relative",
            border: "solid 1px #333",
            borderBottom: "none"
        }

        const box = {
            backgroundColor: "#333",
            width: 30,
            height: 30,
            display: "inline-block",
            float: "left",
            position: "relative",
            // top: -4
        }

        const inputsty = {
            float: "right",
            width: 40,
            height: 25,
            fontSize: 16,
            textAlign: "right",
            // borderRadius: 4,
            // border: "solid 1px #222",
        };
        const plus = {
            float: "right",
            width: 25,
            height: 31,
            position: "relative",
            top: -1,
            margin: "0 2px",
            // border: "solid 1px #111",
            borderRadius: 4,
            backgroundColor: "#3c3",
            color: "#fff",
            textAlign: "center",
            textIndent: 0
        };
        const min = {
            float: "right",
            width: 25,
            height: 31,
            position: "relative",
            top: -1,
            // border: "solid 1px #111",
            borderRadius: 4,
            backgroundColor: "#222",
            color: "#fff",
            textAlign: "center",
            textIndent: 0
        };

        const harga = {
            float: "right"
        };

        const btn = {
            backgroundColor: "#694288",
            color: "#fff",
            borderRadius: 5,
            padding: 7,
            fontSize: 14,
            cursor: "pointer",
            margin: "0 5px"
        }

        const d2 = {
            backgroundColor: "#57280f",
            margin: 0,
            width: "90%",
            textAlign: "left",
            textIndent: 15,
            margin: "0 auto",
            height: 40,
            lineHeight: "40px"
        }

        return (
            <div>
                <div style={bdtop}>
                    <span style={harga}>Rp 28.500</span>
                    <span style={min}>-</span>
                    <span style={plus}>+</span>
                    <span>{this.props.item}</span>
                </div>
                <div style={style}>
                    <span style={box} />
                    <span>{this.props.item}</span>
                    <span style={harga}>Rp 28.500</span>
                    <span style={min}>-</span>
                    <span style={plus}>+</span>
                </div>
                <div style={d2}>
                    <span style={btn}>Cari lagi</span>
                    <span style={btn}>Hapus</span>
                </div>
                <div style={style}>
                    <span style={box} />
                    <span>{this.props.item}</span>
                    <span style={harga}>Rp 28.500</span>
                    <span style={min}>-</span>
                    <span style={plus}>+</span>
                </div>
            </div>
        );
    }
})

const ShoppingList = React.createClass({
    onChange(e) {
        this.props.UpdateText(e.target.value);
    },
    render() {
        const text = this.props.text;

        const style = {
            float: "right",
            width: 420,
            height: 600,
            borderRadius: 5,
            border: 'solid 1px #ccc',
            margin: 20,
            textAlign: 'center'
        };

        const inputStyle = {
            width: 300,
            height: 520,
            fontSize: 12
        }

        const h3style = {
            textAlign: "left",
            textIndent: 30
        }

        const priceStyle = {
            position: "absolute",
            top: 10,
            right: 10,
            color: "#3a3"
        };

        const tempList = this.props.eta.items;
        const temps = lodash.map(tempList, (item,idx) => {
            return <Please key={idx} item={item.name}/>
        })

        return (
            <div style={style}>
                <h3 style={h3style}>Laundy List</h3>
                <div>{temps}</div>
            </div>
        );
    }
})

function StateToProps(state) {
    return {
        eta: state.etalase,
        text: state.item.text,
        totalHarga: TotalHarga(ItemList(state.item.text), state.item.map)
    }
}

function DispatchToProps(dispatch) {
    return {
        UpdateText: (text) => {
            dispatch(UpdateText(text))
        }
    }
}

export default connect(StateToProps, DispatchToProps)(ShoppingList)
