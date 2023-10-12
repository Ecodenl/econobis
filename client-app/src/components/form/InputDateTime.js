import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'react-bootstrap-time-picker';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const InputDateTime = props => {
    const {
        className,
        label,
        sizeDate,
        sizeTime,
        divSize,
        id,
        name,
        value,
        onChangeActionDate,
        onChangeActionTime,
        start,
        end,
        step,
        readOnly,
        required,
        textToolTip,
        error,
        errorMessage,
        disabledBefore,
        disabledAfter,
    } = props;

    const [errorDateFormat, setErrorDateFormat] = useState(false);

    const validateDate = event => {
        const date = moment(event.target.value, 'DD-MM-YYYY', true);
        let errorDateFormat = false;

        if (!date.isValid() && event.target.value !== '') {
            errorDateFormat = true;
        }

        if (disabledBefore) {
            if (date.isBefore(disabledBefore)) {
                errorDateFormat = true;
            }
        }

        if (disabledAfter) {
            if (date.isAfter(disabledAfter)) {
                errorDateFormat = true;
            }
        }

        setErrorDateFormat(errorDateFormat);
    };

    const onDateChange = date => {
        // Convert date in correct value for database
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';
        let errorDateFormat = false;

        if (formattedDate && disabledBefore) {
            if (moment(formattedDate).isBefore(disabledBefore)) {
                errorDateFormat = true;
            }
        }

        if (formattedDate && disabledAfter) {
            if (moment(formattedDate).isAfter(disabledAfter)) {
                errorDateFormat = true;
            }
        }

        setErrorDateFormat(errorDateFormat);

        !errorDateFormat && onChangeActionDate(formattedDate, name);
    };

    const formattedDate = value ? moment(value).format('L') : '';
    const formattedTime = value ? moment(value).format('HH:mm') : '';

    const [disabledDays, setDisabledDays] = useState({
        before: disabledBefore ? new Date(disabledBefore) : '',
        after: disabledAfter ? new Date(disabledAfter) : '',
    });

    const onTimeChange = timeInSeconds => {
        // Workaround for converting seconds to HH:mm:ss
        const formattedTime = moment('1900-01-01 00:00:00')
            .add(timeInSeconds, 'seconds')
            .format('HH:mm');
        onChangeActionTime(formattedTime, name);
    };

    return (
        <div className={`form-group ${divSize}`}>
            <label htmlFor={id} className={`col-sm-6 ${required}`}>
                {label}
            </label>
            <div className={`${sizeDate}`}>
                <DayPickerInput
                    id={id}
                    value={formattedDate}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    onDayChange={onDateChange}
                    dayPickerProps={{
                        showWeekNumbers: true,
                        locale: 'nl',
                        firstDayOfWeek: 1,
                        localeUtils: MomentLocaleUtils,
                        disabledDays: disabledDays,
                    }}
                    inputProps={{
                        className:
                            `form-control input-sm ${className}` + (errorDateFormat || error ? ' has-error' : ''),
                        name: name,
                        onBlur: validateDate,
                        autoComplete: 'off',
                        readOnly: readOnly,
                        disabled: readOnly,
                    }}
                    required={required}
                    readOnly={readOnly}
                    placeholder={''}
                />
            </div>
            <div className={`${sizeTime}`}>
                {!readOnly ? (
                    <TimePicker
                        name={name}
                        value={formattedTime}
                        onChange={onTimeChange}
                        start={start}
                        end={end}
                        step={step}
                        format={24}
                        className={'input-sm'}
                    />
                ) : (
                    <input
                        name={name}
                        value={formattedTime}
                        className={'form-control input-sm'}
                        readOnly={true}
                        disabled={true}
                    />
                )}
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
            {error && (
                <div className="col-sm-offset-6 col-sm-6">
                    <span className="has-error-message"> {errorMessage}</span>
                </div>
            )}
        </div>
    );
};

InputDateTime.defaultProps = {
    className: '',
    sizeDate: 'col-sm-3',
    sizeTime: 'col-sm-3',
    divSize: 'col-sm-6',
    required: '',
    readOnly: false,
    value: null,
    name: '',
    textToolTip: '',
    error: false,
    errorMessage: '',
    disabledBefore: null,
    disabledAfter: null,
    start: '08:00',
    end: '23:00',
    step: 15,
};

InputDateTime.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    sizeDate: PropTypes.string,
    sizeTime: PropTypes.string,
    divSize: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string]),
    onChangeActionDate: PropTypes.func,
    onChangeActionTime: PropTypes.func,
    start: PropTypes.string,
    end: PropTypes.string,
    step: PropTypes.number,
    readOnly: PropTypes.bool,
    textToolTip: PropTypes.string,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    disabledBefore: PropTypes.string,
    disabledAfter: PropTypes.string,
};

export default InputDateTime;
