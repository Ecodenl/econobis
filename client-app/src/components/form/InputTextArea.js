import React from 'react';
import PropTypes from 'prop-types';

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
        error,
        errorMessage,
        rows,
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
                    />
                </div>
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
    error: false,
    errorMessage: '',
    rows: '5',
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
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
};

export default InputTextArea;