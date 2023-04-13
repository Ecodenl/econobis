import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-icons-kit';
import { refresh } from 'react-icons-kit/fa/refresh';

const ButtonText = props => {
    const { buttonClassName, buttonText, onClickAction, type, value, loading, loadText, disabled, title } = props;

    if (loading) {
        return (
            <button
                type={type}
                className={`btn btn-sm btn-loading ${buttonClassName}`}
                value={value}
                disabled={loading}
            >
                <Icon size={14} icon={refresh} /> {loadText}
            </button>
        );
    } else {
        return (
            <button
                type={type}
                className={`btn btn-sm ${buttonClassName}`}
                onClick={onClickAction}
                value={value}
                disabled={disabled}
                title={title}
            >
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
    disabled: false,
    title: '',
};

ButtonText.propTypes = {
    buttonClassName: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    onClickAction: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string,
    loading: PropTypes.bool,
    loadText: PropTypes.string,
    disabled: PropTypes.bool,
    title: PropTypes.string,
};

export default ButtonText;
