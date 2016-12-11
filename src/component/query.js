import React from 'react'
import style from './query.css'
import {Query} from '../reducer/etalase'
import {connect} from 'react-redux'

const QueryBox = React.createClass({
    getInitialState() {
        return {}
    },
    findItem(e) {
        this.props.StartLoading();

        const timeOut = this.state.timeOut;
        const keyword = e.target.value;
        if (timeOut) {
            clearTimeout(timeOut);
        }

        const newTimeOut = setTimeout(() => {
            this.props.Query(keyword);
        }, 2000);

        this.setState({
            timeOut: newTimeOut
        })
    },
    render() {
        return (
            <div className={style.box}>
                <input className={style.input} onChange={this.findItem} />
                <button />
            </div>
        );
    }
})

function DispatchToProps(dispatch) {
    return {
        Query: (keyword) => {
            dispatch(Query(keyword));
        },
        StartLoading: () => {
            dispatch({type: "etalase/startLoading"});
        }
    }
};

export default connect(undefined, DispatchToProps)(QueryBox);
