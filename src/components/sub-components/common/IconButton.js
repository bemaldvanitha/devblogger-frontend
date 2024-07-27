import React from 'react';

import './IconButton.css';

const IconButton = ({ icon, text, onClick, backgroundColor = '', color = '' }) => {
    return(
        <div onClick={onClick} className={'icon-button-container'} style={{backgroundColor: backgroundColor}}>
            <div className="icon-button-icon" style={{color: color}}>{icon}</div>
            <p className={'icon-button-text'} style={{color: color}}>{text}</p>
        </div>
    )
}

export default IconButton;