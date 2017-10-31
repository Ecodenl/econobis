import React from 'react';
import PropTypes from 'prop-types';

const ButtonText = (props) => {
    const {buttonClassName, buttonText, onClickAction, type, value} = props;

    return (
        <button type={type} className={`btn btn-sm ${buttonClassName}`} onClick={onClickAction} value={value}>
            {buttonText}
        </button>
    );
};

ButtonText.defaultProps = {
    buttonClassName: 'btn-success',
    type: 'button',
    value: ''
};

ButtonText.propTypes = {
    buttonClassName: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    onClickAction: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string,
};

export default ButtonText;