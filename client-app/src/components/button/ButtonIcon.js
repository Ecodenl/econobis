import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { copy } from 'react-icons-kit/fa/copy';

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
            {iconName === 'copy' ? <Icon size={12} icon={copy} /> : <span className={`glyphicon ${iconName}`} />}
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
