import React from 'react';

const PopUp = ({ isOpen, onClose, text, btntext = 'Close' }) => {
    if (!isOpen) {
        return null; // Render nothing if modal is closed
    }
    
    return (
        <div className="fixed top-0 left-0 w-100 h-100 flex items-center justify-center bg-black-50">
            <div className="bg-white pa4 br3 tc">
                <p className='h-copy measure center f6 black-70'>{text}</p>
                <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={onClose}>{btntext}</button>
            </div>
        </div>
    );
};

export default PopUp;