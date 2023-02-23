import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { copy } from 'react-icons-kit/fa/copy';
import { trash } from 'react-icons-kit/fa/trash';
import { arrowLeft } from 'react-icons-kit/fa/arrowLeft';
import { refresh } from 'react-icons-kit/fa/refresh';
import { plus } from 'react-icons-kit/fa/plus';
import { download } from 'react-icons-kit/fa/download';
import { upload } from 'react-icons-kit/fa/upload';

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
            {
                iconName === 'copy' ? <Icon size={12} icon={copy} /> :
                iconName === 'trash' ? <Icon size={15} icon={trash} /> :
                iconName === 'arrowLeft' ? <Icon size={15} icon={arrowLeft} /> :
                iconName === 'refresh' ? <Icon size={15} icon={refresh} /> :
                iconName === 'plus' ? <Icon size={15} icon={plus} /> :
                iconName === 'download' ? <Icon size={15} icon={download} /> :
                iconName === 'upload' ? <Icon size={15} icon={upload} /> :
                <span className={`glyphicon ${iconName}`} />
            }
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
