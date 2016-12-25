import React from 'react'
import Ringkasan from './ringkasan'
import Detil from './detil'
import styles from './index.css'

const Base = React.createClass({
    render() {
        return (
            <div className={styles.base}>
                <Detil />
                <Ringkasan / >
            </div>
        );
    }
})

export default Base
