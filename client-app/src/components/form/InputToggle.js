import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import moment from 'moment/moment';

const InputToggle = props => {
    const {
        label,
        size,
        id,
        name,
        value,
        onChangeAction,
        textToolTip,
        required,
        divSize,
        labelSize,
        className,
        disabled,
        itemId,
        additionalTextValue,
    } = props;

    return (
        <div className={`form-group ${divSize} ${className}`}>
            <div>
                <label htmlFor={id} className={`${labelSize} ${required}`}>
                    {label}
                </label>
            </div>
            <div className={`${size}`}>
                <Toggle
                    id={id}
                    name={name}
                    onChange={onChangeAction}
                    // defaultChecked={value}
                    checked={value}
                    disabled={disabled}
                    data-item-id={itemId ?? ''}
                />
                {additionalTextValue ? (
                    <span>
                        <em>{additionalTextValue}</em>
                    </span>
                ) : null}
            </div>
            {textToolTip && (
                <div className="col-sm-1">
                    <FaInfoCircle color={'blue'} size={'15px'} data-tip={textToolTip} data-for={`tooltip-${name}`} />
                    <ReactTooltip
                        id={`tooltip-${name}`}
                        effect="float"
                        place="right"
                        multiline={true}
                        aria-haspopup="true"
                    />
                </div>
            )}
        </div>
    );
};

InputToggle.defaultProps = {
    className: '',
    size: 'col-sm-6',
    divSize: 'col-sm-6',
    labelSize: 'col-sm-6',
    required: '',
    disabled: false,
    value: false,
    textToolTip: '',
    additionalTextValue: '',
};

InputToggle.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.string,
    divSize: PropTypes.string,
    labelSize: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    textToolTip: PropTypes.string,
    additionalTextValue: PropTypes.string,
    value: PropTypes.bool,
    onChangeAction: PropTypes.func,
    required: PropTypes.string,
    disabled: PropTypes.bool,
};

export default InputToggle;
