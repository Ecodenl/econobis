import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ field, type, className, id, readOnly, error, placeholder }) => {
    return (
        <>
            <input
                type={type}
                className={`text-input content w-input ${Boolean(error) ? 'has-error' : ''} `}
                id={id}
                {...field}
                readOnly={readOnly}
                placeholder={placeholder}
            />
            {error ? <span className={'error-message text-danger'}>{error}</span> : null}
        </>
    );
};

InputText.defaultProps = {
    type: 'text',
    className: '',
    readOnly: false,
    error: false,
    placeholder: '',
};

InputText.propTypes = {
    field: PropTypes.object.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    readOnly: PropTypes.bool,
    error: PropTypes.bool,
    placeholder: PropTypes.string,
};

export default InputText;
