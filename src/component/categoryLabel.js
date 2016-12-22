import React from 'react'
import EtalaseStyle from './etalase.css'

const CategoryLabel = ({name, count}) => {
    return (
        <div className={EtalaseStyle.categoryLabelWrapper}>
            <span className={EtalaseStyle.categoryLabel}>{name} { count > 0 ? `(${count} items)` : ""}</span>
            <div style={{clear: 'both'}} />
        </div>
    );
}

export default CategoryLabel
