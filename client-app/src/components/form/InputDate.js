import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';

moment.locale('nl');

class InputDate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorDateFormat: false,
        };
    }

    validateDate = event => {
        const date = moment(event.target.value, 'DD-MM-YYYY', true);
        let errorDateFormat = false;

        if (!date.isValid() && event.target.value !== '') {
            errorDateFormat = true;
        }

        if (this.props.disabledBefore) {
            if (date.isBefore(this.props.disabledBefore)) {
                errorDateFormat = true;
            }
        }

        if (this.props.disabledAfter) {
            if (date.isAfter(this.props.disabledAfter)) {
                errorDateFormat = true;
            }
        }

        this.setState({ errorDateFormat });
    };

    onDateChange = date => {
        // Convert date in correct value for database
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';
        let errorDateFormat = false;

        if (formattedDate && this.props.disabledBefore) {
            if (moment(formattedDate).isBefore(this.props.disabledBefore)) {
                errorDateFormat = true;
            }
        }

        if (formattedDate && this.props.disabledAfter) {
            if (moment(formattedDate).isAfter(this.props.disabledAfter)) {
                errorDateFormat = true;
            }
        }

        this.setState({ errorDateFormat });

        !errorDateFormat && this.props.onChangeAction(formattedDate, this.props.name);
    };

    render() {
        const {
            label,
            className,
            size,
            divSize,
            id,
            value,
            required,
            readOnly,
            name,
            error,
            disabledBefore,
            disabledAfter,
        } = this.props;

        const formattedDate = value ? moment(value).format('L') : '';
        let disabledDays = {};
        if (disabledBefore) disabledDays.before = new Date(disabledBefore);
        if (disabledAfter) disabledDays.after = new Date(disabledAfter);

        return (
            <div className={`form-group ${divSize}`}>
                <div>
                    <label htmlFor={id} className={`col-sm-6 ${required}`}>
                        {label}
                    </label>
                </div>
                <div className={`${size}`}>
                    <DayPickerInput
                        id={id}
                        value={formattedDate}
                        formatDate={formatDate}
                        parseDate={parseDate}
                        onDayChange={this.onDateChange}
                        dayPickerProps={{
                            showWeekNumbers: true,
                            locale: 'nl',
                            firstDayOfWeek: 1,
                            localeUtils: MomentLocaleUtils,
                            disabledDays: disabledDays,
                        }}
                        inputProps={{
                            className:
                                `form-control input-sm ${className}` +
                                (this.state.errorDateFormat || error ? ' has-error' : ''),
                            name: name,
                            onBlur: this.validateDate,
                            autoComplete: 'off',
                            readOnly: readOnly,
                            disabled: readOnly,
                        }}
                        required={required}
                        readOnly={readOnly}
                        placeholder={''}
                    />
                </div>
            </div>
        );
    }
}

InputDate.defaultProps = {
    className: '',
    size: 'col-sm-6',
    divSize: 'col-sm-6',
    required: '',
    readOnly: false,
    value: null,
    error: false,
    disabledBefore: null,
    disabledAfter: null,
};

InputDate.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    divSize: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChangeAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool,
    error: PropTypes.bool,
    disabledBefore: PropTypes.string,
    disabledAfter: PropTypes.string,
};

export default InputDate;
