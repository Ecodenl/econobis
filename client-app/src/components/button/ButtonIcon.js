import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { copy } from 'react-icons-kit/fa/copy';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';
import { arrowLeft } from 'react-icons-kit/fa/arrowLeft';
import { arrowRight } from 'react-icons-kit/fa/arrowRight';
import { refresh } from 'react-icons-kit/fa/refresh';
import { plus } from 'react-icons-kit/fa/plus';
import { download } from 'react-icons-kit/fa/download';
import { upload } from 'react-icons-kit/fa/upload';
import { check } from 'react-icons-kit/fa/check';
import { filter } from 'react-icons-kit/fa/filter';
import { compress } from 'react-icons-kit/fa/compress';
import { envelopeO } from 'react-icons-kit/fa/envelopeO';
import { cog } from 'react-icons-kit/fa/cog';
import { searchPlus } from 'react-icons-kit/fa/searchPlus';
import { searchMinus } from 'react-icons-kit/fa/searchMinus';
import { eye } from 'react-icons-kit/fa/eye';
import { euro } from 'react-icons-kit/fa/euro';
import { bullhorn } from 'react-icons-kit/fa/bullhorn';
import { remove } from 'react-icons-kit/fa/remove';
import { hourglassHalf } from 'react-icons-kit/fa/hourglassHalf';

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
            {iconName === 'copy' ? (
                <Icon size={12} icon={copy} />
            ) : iconName === 'pencil' ? (
                <Icon size={15} icon={pencil} />
            ) : iconName === 'trash' ? (
                <Icon size={15} icon={trash} />
            ) : iconName === 'arrowLeft' ? (
                <Icon size={15} icon={arrowLeft} />
            ) : iconName === 'arrowRight' ? (
                <Icon size={15} icon={arrowRight} />
            ) : iconName === 'refresh' ? (
                <Icon size={15} icon={refresh} />
            ) : iconName === 'plus' ? (
                <Icon size={15} icon={plus} />
            ) : iconName === 'download' ? (
                <Icon size={15} icon={download} />
            ) : iconName === 'upload' ? (
                <Icon size={15} icon={upload} />
            ) : iconName === 'check' ? (
                <Icon size={15} icon={check} />
            ) : iconName === 'filter' ? (
                <Icon size={15} icon={filter} />
            ) : iconName === 'compress' ? (
                <Icon size={15} icon={compress} />
            ) : iconName === 'envelopeO' ? (
                <Icon size={15} icon={envelopeO} />
            ) : iconName === 'cog' ? (
                <Icon size={15} icon={cog} />
            ) : iconName === 'searchPlus' ? (
                <Icon size={15} icon={searchPlus} />
            ) : iconName === 'searchMinus' ? (
                <Icon size={15} icon={searchMinus} />
            ) : iconName === 'eye' ? (
                <Icon size={15} icon={eye} />
            ) : iconName === 'euro' ? (
                <Icon size={15} icon={euro} />
            ) : iconName === 'bullhorn' ? (
                <Icon size={15} icon={bullhorn} />
            ) : iconName === 'remove' ? (
                <Icon size={15} icon={remove} />
            ) : iconName === 'hourglassHalf' ? (
                <Icon size={15} icon={hourglassHalf} />
            ) : (
                <span className={`glyphicon ${iconName}`} />
            )}
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
