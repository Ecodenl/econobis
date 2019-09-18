import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import Button from 'react-bootstrap/Button';

const ButtonText = ({
    buttonClassName,
    buttonText,
    onClickAction,
    type,
    loading,
    title,
    loadingSpinnerColor,
    disabled,
}) => (
    <Button
        type={type}
        className={`${buttonClassName}`}
        onClick={onClickAction}
        disabled={loading || disabled}
        title={title}
        size="sm"
    >
        {loading ? <ClipLoader color={loadingSpinnerColor} size={17} /> : <span>{buttonText}</span>}
    </Button>
);

ButtonText.defaultProps = {
    buttonClassName: '',
    type: 'button',
    title: '',
    loading: false,
    loadingSpinnerColor: 'white',
    disabled: false,
};

ButtonText.propTypes = {
    buttonClassName: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    onClickAction: PropTypes.func,
    type: PropTypes.string,
    title: PropTypes.string,
    loading: PropTypes.bool,
    loadingSpinnerColor: PropTypes.string,
    disabled: PropTypes.bool,
};

export default ButtonText;
