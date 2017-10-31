import React from 'react';
import PropTypes from 'prop-types';

const ButtonIcon = (props) => {
    const {buttonClassName, iconName, onClickAction} = props;

    return (
        <button type="button" className={`btn ${buttonClassName}`} onClick={onClickAction}>
            <span className={`glyphicon ${iconName}`} />
        </button>
    );
};

ButtonIcon.defaultProps = {
    buttonClassName: 'btn-success btn-sm',
};

ButtonIcon.propTypes = {
    buttonClassName: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    onClickAction: PropTypes.func,
};

export default ButtonIcon;