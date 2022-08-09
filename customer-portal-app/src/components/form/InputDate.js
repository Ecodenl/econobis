import React, { useState } from 'react';
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
    manualInput,
    name,
    disabledBefore,
    disabledAfter,
    onChangeAction,
    placeholder,
    showErrorMessage,
    errors,
    touched,
    classNameErrorMessage,
}) => {
    const handleDayChange = date => {
        // Convert date in correct value for database
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        onChangeAction(name, formattedDate);
    };

    const formattedDate = value ? moment(value).format('L') : '';
    let disabledDays = {};
    if (disabledBefore) disabledDays.before = new Date(disabledBefore);
    if (disabledAfter) disabledDays.after = new Date(disabledAfter);

    return (
        <>
            {/*{get(errors, name, '') && get(touched, name, '') && showErrorMessage ? (*/}
            {get(errors, name, '') && showErrorMessage ? (
                <>
                    <small className={`${classNameErrorMessage}`}>{get(errors, name, '')}</small>
                    <br />
                </>
            ) : null}
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
                    disabledDays: disabledDays,
                }}
                inputProps={{
                    className: `text-input content ${className}
                     ${Boolean(manualInput) ? ' w-input' : ' w-input-date'}
                     ${
                         // Boolean(get(errors, name, '') && get(touched, name, '')) ? 'has-error mb-0' : ''
                         Boolean(get(errors, name, '')) ? ' has-error mb-0' : ''
                     } `,
                    name: name,
                    autoComplete: 'off',
                    readOnly: Boolean(manualInput) ? readOnly : true,
                    disabled: readOnly,
                    placeholder: placeholder,
                }}
                required={required}
                readOnly={readOnly}
                placeholder={''}
                style={{ width: '100%' }}
            />
        </>
    );
};

InputDate.defaultProps = {
    className: '',
    required: '',
    readOnly: false,
    manualInput: true,
    value: null,
    placeholder: '',
    showErrorMessage: true,
    classNameErrorMessage: 'text-danger',
    errors: {},
    touched: {},
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
    placeholder: PropTypes.string,
    showErrorMessage: PropTypes.bool,
    classNameErrorMessage: PropTypes.string,
    errors: PropTypes.object,
    touched: PropTypes.object,
};

export default InputDate;
