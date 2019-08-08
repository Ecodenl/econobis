import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

const ButtonText = ({ buttonClassName, buttonText, onClickAction, type, loading, title, loadingSpinnerColor }) => (
    <button
        type={type}
        className={`btn btn-sm ${buttonClassName}`}
        onClick={onClickAction}
        disabled={loading}
        title={title}
    >
        {loading ? <ClipLoader color={loadingSpinnerColor} size={17} /> : <span>{buttonText}</span>}
    </button>
);

ButtonText.defaultProps = {
    buttonClassName: '',
    type: 'button',
    title: '',
    loading: false,
    loadingSpinnerColor: 'white',
};

ButtonText.propTypes = {
    buttonClassName: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    onClickAction: PropTypes.func,
    type: PropTypes.string,
    title: PropTypes.string,
    loading: PropTypes.bool,
    loadingSpinnerColor: PropTypes.string,
};

export default ButtonText;
