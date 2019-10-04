import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';
import { get } from 'lodash';

const InputDate = ({
    className,
    id,
    value,
    required,
    readOnly,
    name,
    onChangeAction,
    error,
    placeholder,
    showErrorMessage,
    errors,
    touched,
    classNameErrorMessage,
}) => {
    const validateDate = event => {
        const date = moment(event.target.value, 'DD-MM-YYYY', true);

        if (date.isValid() && event.target.value !== '') {
            onChangeAction(name, moment(date).format('Y-MM-DD'));
        }
    };

    const handleDayChange = date => {
        // Convert date in correct value for database
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        onChangeAction(name, formattedDate);
    };

    const formattedDate = value ? moment(value).format('L') : '';

    return (
        <>
            <DayPickerInput
                id={id}
                value={formattedDate}
                onDayChange={handleDayChange}
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                    showWeekNumbers: true,
                    locale: 'nl',
                    firstDayOfWeek: 1,
                    localeUtils: MomentLocaleUtils,
                }}
                inputProps={{
                    className: `text-input content w-input ${className}`,
                    name: name,
                    onBlur: validateDate,
                    autoComplete: 'off',
                    readOnly: readOnly,
                    disabled: readOnly,
                    placeholder: placeholder,
                }}
                required={required}
                readOnly={readOnly}
                placeholder={''}
            />
            {get(errors, name, '') && get(touched, name, '') && showErrorMessage ? (
                <small className={`${classNameErrorMessage}`}>{get(errors, name, '')}</small>
            ) : null}
        </>
    );
};

InputDate.defaultProps = {
    className: '',
    required: '',
    readOnly: false,
    value: null,
    error: false,
    placeholder: '',
};

InputDate.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChangeAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    error: PropTypes.bool,
    placeholder: PropTypes.string,
};

export default InputDate;
