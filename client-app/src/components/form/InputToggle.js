import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle'

const InputToggle = props => {
    const { label, size, id, name, value, onChangeAction, required } = props;

    return (
        <div className="form-group col-sm-6">
            <div><label htmlFor={ id } className={`col-sm-6 ${required}`}>{ label }</label></div>
            <div className={`${size}`}>
                <Toggle
                    id={id}
                    name={name}
                    onChange={onChangeAction}
                    checked={value}
                />
            </div>
        </div>
    );
};

InputToggle.defaultProps = {
    className: '',
    size: 'col-sm-6',
    required: '',
    readOnly: false,
    value: null,
};

InputToggle.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onChangeAction: PropTypes.func,
    required: PropTypes.string,
    error: PropTypes.bool,
};

export default InputToggle;