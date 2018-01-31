import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils from 'react-day-picker/moment';
import moment from 'moment';
moment.locale('nl');

const InputDate = props => {
    const { label, className, size, id, value, onChangeAction, required, readOnly } = props;

    const formattedDate = value
        ? moment(value).format('L')
        : '';

    return (
        <div className="form-group col-sm-6">
            <div><label htmlFor={ id } className={`col-sm-6 ${required}`}>{ label }</label></div>
            <div className={`${size}`}>
                <DayPickerInput
                    className={`form-control input-sm ${className}`}
                    id={ id }
                    value={ formattedDate }
                    onDayChange={onChangeAction}
                    dayPickerProps={{
                        showWeekNumbers: true,
                        locale: "nl",
                        firstDayOfWeek: 1,
                        localeUtils: MomentLocaleUtils,
                    }}
                    required={ required }
                    readOnly={ readOnly }
                />
            </div>
        </div>
    );
};

InputDate.defaultProps = {
    className: '',
    size: 'col-sm-6',
    required: '',
    readOnly: false,
    value: null,
};

InputDate.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onChangeAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool
};

export default InputDate;