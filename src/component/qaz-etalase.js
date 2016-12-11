import React from 'react';
import {connect} from 'react-redux'
import lodash from 'lodash'
import {UpdateText} from '../reducers/etalase'
import Loading from './itemLoading'
import Commends from './etalaseCommend'

const Etalase = React.createClass({
    onChange(e) {
        this.props.UpdateText(e.target.value)
    },
    render() {
        const style = {
            float: "left",
            width: 770,
            height: 600,
            borderRadius: 5,
            border: 'solid 1px #ccc',
            margin: 20,
            textAlign: 'center',
            overflow: "scroll"
        };

        const inputStyle = {
            display: "block",
            height: 35,
            width: "95%",
            margin: 20,
            borderRadius: 5,
            border: "solid 1px #aaa",
            textIndent: 10,
            fontSize: 13
        };
        const {query, results, loading} = this.props.etalase;

        const commends = lodash.map(results, (item, idx) => {
            return <Commends item={item} key={idx} idx={idx} query={query} />
        })

        const etaStyle = {
            textAlign: 'left',
            margin: 20
        }

        return (
            <div style={style}>
                <input style={inputStyle} value={query} onChange={this.onChange} />
                {
                    loading &&
                    <Loading />
                }
                {
                    !loading &&
                    <div style={etaStyle}>
                        {commends}
                    </div>
                }
            </div>
        );
    }
})

function StateToProps(state) {
    return {
        etalase: state.etalase
    }
}

function DispatchToProps(dispatch) {
    return {
        UpdateText: (text) => {
            dispatch(UpdateText(text))
        }
    }
}

export default connect(StateToProps, DispatchToProps)(Etalase);
