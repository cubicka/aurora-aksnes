import React from 'react';
import {connect} from 'react-redux'
import lodash from 'lodash'
import {ItemList} from '../reducers/item'
import ShoppingItem from './shoppingItem'

const SmartBoard = React.createClass({
    render() {
        const itemMap = this.props.itemMap;

        const items = lodash.chain(this.props.items)
        .map((item, idx) => {
            return <ShoppingItem item={itemMap[item]} key={idx} />
        })
        .value();

        const style = {
            float: "left",
            width: 830,
            height: 600,
            borderRadius: 5,
            border: 'solid 1px #ccc',
            margin: 20,
            textAlign: 'center',
            overflow: "scroll"
        };

        return (
            <div style={style}>
                <h3>Smart Board</h3>
                <div>{items}</div>
            </div>
        );
    }
})

function StateToProps(state) {
    return {
        items: ItemList(state.item.text),
        itemMap: state.item.map
    }
}

export default connect(StateToProps)(SmartBoard);
