import React from 'react'
import {connect} from 'react-redux'
import {Sub as CartSub} from '../reducer/cart'

import style from './counter.css'

const Counter = React.createClass({
    onChange() {

    },
    render() {
        const {value, Inc, Dec,} = this.props;
        return (
            <div className={style.counterWrapper}>
                <span className={style.negBtn} onClick={Dec} >-</span>
                <input className={style.value} value={value} onChange={this.onChange} />
                <span className={style.posBtn} onClick={Inc} >+</span>
            </div>
        );
    }
})

const StateToProps = (state, ownProps) => {
    return {
        value: CartSub('cart/count', state, ownProps.id)
    }
}

const DispatchToProps = (dispatch, ownProps) => {
    return {
        Inc: () => {
            dispatch({
                type: "cart/inc",
                id: ownProps.id
            })
        },
        Dec: () => {
            dispatch({
                type: "cart/dec",
                id: ownProps.id
            })
        }
    }
}

export default connect(StateToProps, DispatchToProps)(Counter);
