import React from 'react';
import PropTypes from 'prop-types';

const ButtonTextNormalSize = props => {
    const { buttonClassName, buttonText, onClickAction, type, value, loading, loadText } = props;

    if (loading) {
        return (
            <button type={type} className={`btn btn-loading ${buttonClassName}`} value={value}>
                <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" /> {loadText}
            </button>
        );
    } else {
        return (
            <button type={type} className={`btn ${buttonClassName}`} onClick={onClickAction} value={value}>
                {buttonText}
            </button>
        );
    }
};

ButtonTextNormalSize.defaultProps = {
    buttonClassName: 'btn-success',
    type: 'button',
    value: '',
    loading: false,
    loadText: 'Aan het laden',
};

ButtonTextNormalSize.propTypes = {
    buttonClassName: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    onClickAction: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string,
    loading: PropTypes.bool,
    loadText: PropTypes.string,
};

export default ButtonTextNormalSize;
