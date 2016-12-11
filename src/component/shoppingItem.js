import React from 'react';
import lodash from 'lodash';
import Loading from './itemLoading'
import Commendation from './itemCommendation'

const Item = React.createClass({
    render() {
        const item = this.props.item;
        const commends = lodash.map(item.commends, (commend, idx) => {
            return <Commendation item={commend} key={idx} itemKey={item.key} idx={idx} selected={item.selection === idx} />
        })

        const style = {
            textAlign: 'left',
            margin: 20,
            fontSize: 16,
            borderRadius: 5,
            border: 'solid 1px #333',
            padding: 10,
            position: "relative"
        }

        const x = parseInt(item.key, 10);
        let num, name;

        if (isNaN(x)) {
            num = 0;
            name = item.key;
        } else {
            num = x;
            name = !isNaN(item.selection) ? item.commends[item.selection].name : item.key.substr(item.key.indexOf(num.toString()) + num.toString().length).trim();
        }

        const priceStyle = {
            position: "absolute",
            top: 10,
            right: 10,
            color: "#3a3"
        };

        return (
            <div style={style}>
                {
                    !isNaN(item.selection) &&
                    <span style={priceStyle}>Rp {!isNaN(item.selection) && item.commends[item.selection].harga}</span>
                }
                <span>{num} - {name}</span>
                <hr />
                {
                    !item.done &&
                    <Loading />
                }
                {
                    item.done && commends
                }
            </div>
        );
    }
})

export default Item;
