import React from 'react'
import lodash from 'lodash'
import {connect} from 'react-redux'
import './commend.css';
import {PickItems} from '../reducers/etalase'
import kecap from './kecap'

const Commendation = React.createClass({
    render() {
        const item = this.props.item;
        const cname = this.props.selected ? "commends selected" : "commends"
        const buttonStyle = {
            display: "inline-block",
            width: 30,
            height: 30,
            backgroundColor: "#3c3",
            borderRadius: 5,
            lineHeight: "30px"
        }

        const buttonWrap = {
            position: "absolute",
            bottom: 5,
            left: 0,
            right: 0,
            margin: "0 auto",
            textAlign: 'center'
        }

        const posStyle = {
            color: "#fff",
        }

        const minStyle = {
            backgroundColor: "#c33",
            color: "#fff",
        }

        const numStyle = {
            color: "#333",
            backgroundColor: "#fff"
        }

        return (
            <div className={cname}>
                <img className="cgambar" src={kecap[item.gambar]} alt="kecap" />
                <h5 className="cname">{item.name}</h5>
                <h6 className="charga">Rp {item.harga}</h6>
                <div style={buttonWrap}>
                    <div style={lodash.assign({}, buttonStyle, posStyle)}>+</div>
                    <div style={lodash.assign({}, buttonStyle, numStyle)}>0</div>
                    <div style={lodash.assign({}, buttonStyle, minStyle)}>-</div>
                </div>
            </div>
        );
    }
})

function DispatchToProps(dispatch, ownProps) {
    const currentKey = ownProps.query, currentIdx = ownProps.idx;
    return {
        Select: () => {
            console.log('click')
            dispatch(PickItems(currentKey, currentIdx))
        }
    }
}

export default connect(undefined, DispatchToProps)(Commendation);
// export default Commendation;
