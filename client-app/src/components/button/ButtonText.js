import React from 'react';
import PropTypes from 'prop-types';

const ButtonText = props => {
    const { buttonClassName, buttonText, onClickAction, type, value, loading, loadText } = props;

    if (loading) {
        return (
            <button
                type={type}
                className={`btn btn-sm btn-loading ${buttonClassName}`}
                value={value}
                disabled={loading}
            >
                <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" /> {loadText}
            </button>
        );
    } else {
        return (
            <button type={type} className={`btn btn-sm ${buttonClassName}`} onClick={onClickAction} value={value}>
                {buttonText}
            </button>
        );
    }
};

ButtonText.defaultProps = {
    buttonClassName: 'btn-success',
    type: 'button',
    value: '',
    loading: false,
    loadText: 'Aan het laden',
};

ButtonText.propTypes = {
    buttonClassName: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    onClickAction: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string,
    loading: PropTypes.bool,
    loadText: PropTypes.string,
};

export default ButtonText;
