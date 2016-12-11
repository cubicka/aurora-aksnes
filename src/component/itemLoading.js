import React from 'react';
import loadingImage from '../../img/loading.gif';

function Loading() {
    const style = {
        height: 100,
        overflow: 'hidden',
        textAlign: 'center'
    }

    const imgStyle = {
        position: 'relative',
        top: -100
    }

    return (
        <div style={style}>
            <img src={loadingImage} alt="loading" style={imgStyle} />
        </div>
    );
}

export default Loading;
