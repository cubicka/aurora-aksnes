import lodash from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import styles from './styles.css'
import {GetOrderList} from '../reducer/order'
import config from '../config.json'

const List = React.createClass({
    componentDidMount() {
        this.props.GetOrderList()
    },
    getDateText(x) {
        const d = new Date(parseInt(x,10));
        return d;
    },
    render() {
        const {list} = this.props;
        const links = lodash.map(list, (link, idx) => {
            const ss = link.split(' ');
            console.log('ss', ss);
            const dd = this.getDateText(ss[1]).toUTCString();
            console.log('ss', dd);
            return <li key={link}><a href={config.backendUrl + '/order/' + link}>{ss[0]} - {dd}</a></li>
            // return <li>1</li>
        })

        return (
            <div className={styles.base}>
                <span className={styles.title}>List Pemesanan</span>
                <ul style={{textAlign:'left', paddingLeft: 40, paddingBottom: 20}}>
                    {links}
                </ul>
            </div>
        );
    }
})

function StateToProps(state) {
    const {order} = state;

    return {
        list: order.list
    }
}

function DisToProps(dispatch) {
    return {
        GetOrderList: () => {
            dispatch(GetOrderList())
        }
    }
}

export default connect(StateToProps, DisToProps)(List)
