import React from 'react';
import PropTypes from 'prop-types';

const ButtonIcon = props => {
    const { buttonClassName, iconName, onClickAction, title } = props;

    return (
        <button type="button" className={`btn ${buttonClassName}`} onClick={onClickAction}>
            <span className={`glyphicon ${iconName}`} title={title} />
        </button>
    );
};

ButtonIcon.defaultProps = {
    buttonClassName: 'btn-success btn-sm',
    title: '',
};

ButtonIcon.propTypes = {
    buttonClassName: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    onClickAction: PropTypes.func,
    title: PropTypes.string,
};

export default ButtonIcon;
