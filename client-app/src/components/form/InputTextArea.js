import React from 'react';
import PropTypes from 'prop-types';
import {FaInfoCircle} from "react-icons/fa";
import ReactTooltip from "react-tooltip";

const InputTextArea = props => {
    const {
        label,
        size,
        sizeLabel,
        sizeInput,
        id,
        name,
        value,
        onChangeAction,
        required,
        disabled,
        error,
        errorMessage,
        rows,
        textToolTip,
    } = props;

    return (
        <div className={`form-group ${size}`}>
            <div className="row">
                {!!label && (
                    <div className={sizeLabel}>
                        <label htmlFor={id} className={`col-sm-12 ${required}`}>
                            {label}
                        </label>
                    </div>
                )}
                <div className={sizeInput}>
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChangeAction}
                        className={'form-control input-sm ' + (error ? 'has-error' : '')}
                        rows={rows}
                        data-item-id={props.itemId ?? ''}
                        disabled={disabled}
                    />
                </div>
                { textToolTip && (
                    <div className="col-sm-1">
                        <FaInfoCircle
                            color={'blue'}
                            size={'15px'}
                            data-tip={textToolTip}
                            data-for={`tooltip-${name}`}
                        />
                        <ReactTooltip
                            id={`tooltip-${name ? name : id}`}
                            effect="float"
                            place="right"
                            multiline={true}
                            aria-haspopup="true"
                        />
                        &nbsp;
                    </div>
                )}
            </div>
            {error && (
                <div className={sizeInput}>
                    <span className="has-error-message"> {errorMessage}</span>
                </div>
            )}
        </div>
    );
};

InputTextArea.defaultProps = {
    size: 'col-sm-12',
    sizeLabel: 'col-sm-3',
    sizeInput: 'col-sm-9',
    value: '',
    required: '',
    disabled: false,
    error: false,
    errorMessage: '',
    rows: '5',
    textToolTip: '',
};

InputTextArea.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    sizeLabel: PropTypes.string,
    sizeInput: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChangeAction: PropTypes.func,
    required: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    textToolTip: PropTypes.string,
};

export default InputTextArea;
