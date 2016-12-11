import React from 'react'
import EtalaseStyle from './etalase.css'

const CategoryLabel = ({name}) => {
    return (
        <div className={EtalaseStyle.categoryLabelWrapper}>
            <span className={EtalaseStyle.categoryLabel}>{name}</span>
            <div style={{clear: 'both'}} />
        </div>
    );
}

export default CategoryLabel
