import React from 'react'
import {connect} from 'react-redux'
import './commend.css';
import {PickItems} from '../reducers/etalase'
import kecap from './kecap'

const Commendation = React.createClass({
    render() {
        const item = this.props.item;
        const cname = this.props.selected ? "commends selected" : "commends"
        return (
            <div className={cname} onClick={this.props.Select}>
                <img className="cgambar" src={kecap[item.gambar]} alt="kecap" />
                <h5 className="cname">{item.name}</h5>
                <h6 className="charga">Rp {item.harga}</h6>
            </div>
        );
    }
})

function DispatchToProps(dispatch, ownProps) {
    const currentKey = ownProps.query, currentIdx = ownProps.idx;
    return {
        Select: () => {
            dispatch(PickItems(currentKey, currentIdx))
        }
    }
}

export default connect(undefined, DispatchToProps)(Commendation);
