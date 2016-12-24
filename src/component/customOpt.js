import React from 'react'
import styles from './customOpt.css'

const OptionX = React.createClass({
    render() {
        const {selected, name, value, onClick} = this.props;
        const opt = selected ? styles.optWrapper + ' ' + styles.selected : styles.optWrapper;

        return (
            <div className={opt} onClick={onClick}>
                <span className={styles.checkbox} />
                <span className={styles.name}>{name}</span>
                <span className={styles.value}>{value}</span>
            </div>
        );
    }
})

export default OptionX;
