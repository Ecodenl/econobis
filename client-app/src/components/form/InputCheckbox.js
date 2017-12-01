import React from 'react';
import PropTypes from 'prop-types';

const InputCheckbox = props => {
    const { label, name,  size, id, onChangeAction, checked, labelCheckbox } = props;

    return (
        <div className="form-group col-sm-6">
            <label className="col-sm-6">{ label }</label>
            <div className={`${size}`}>
                <label htmlFor={ id }>
                <input
                    name={name}
                    type="checkbox"
                    id={id}
                    onChange={onChangeAction}
                    checked={checked}
                />{ labelCheckbox }
                </label>
            </div>
        </div>
    );
};

InputCheckbox.defaultProps = {
    type: 'checkbox',
    size: 'col-sm-6',
    labelCheckbox: '',
};

InputCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChangeAction: PropTypes.func,
    checked:  PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]).isRequired,
    labelCheckbox: PropTypes.string,
};

export default InputCheckbox;
