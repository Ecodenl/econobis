import React from 'react';
import PropTypes from 'prop-types';
import ReactInputMask from 'react-input-mask';

const InputMask = props => {
    const { label, className, size, id, name, value, onChangeAction, required,  error, errorMessage, mask } = props;

    return (
        <div className="form-group col-sm-6">
            <label htmlFor={ id } className={`col-sm-6 ${required}`}>{ label }</label>
            <div className={`${size}`}>
                <ReactInputMask
                    className={`form-control input-sm ${className}` + (error ? 'has-error' : '')}
                    name= { name }
                    value={ value }
                    onChange={ onChangeAction }
                    mask={ mask }
                />
            </div>
            {error &&
                <div className="col-sm-offset-6 col-sm-6">
            <span className='has-error-message'> { errorMessage }</span>
                </div>
            }
        </div>
    );
};

InputMask.defaultProps = {
    className: '',
    size: 'col-sm-6',
    type: 'text',
    value: '',
    required: '',
    readOnly: false,
    maxLength: null,
    error: false,
    min: '',
    max: '',
    errorMessage: '',
    mask: '',
};

InputMask.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChangeAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    maxLength: PropTypes.string,
    error: PropTypes.bool,
    min: PropTypes.string,
    max: PropTypes.string,
    errorMessage: PropTypes.string,
    mask: PropTypes.string,
};

export default InputMask;