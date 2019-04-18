import React from 'react';
import PropTypes from 'prop-types';

const ButtonIcon = props => {
    const { buttonClassName, iconName, onClickAction, title, disabled } = props;

    return (
        <button
            type="button"
            className={`btn ${buttonClassName}`}
            onClick={onClickAction}
            disabled={disabled}
            title={title}
        >
            <span className={`glyphicon ${iconName}`} />
        </button>
    );
};

ButtonIcon.defaultProps = {
    buttonClassName: 'btn-success btn-sm',
    title: '',
    disabled: false,
};

ButtonIcon.propTypes = {
    buttonClassName: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    onClickAction: PropTypes.func,
    title: PropTypes.string,
    disabled: PropTypes.bool,
};

export default ButtonIcon;
