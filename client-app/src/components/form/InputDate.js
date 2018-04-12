import React, {Component} from 'react';
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

    validateDate = (event) => {
        const date = moment(event.target.value, 'DD-MM-YYYY', true);

        if (!date.isValid() && event.target.value !== '') {
            this.setState({
                errorDateFormat: true,
            })
        } else {
            this.setState({
                errorDateFormat: false,
            })
        }
    };

    onDateChange = (date) => {
        // Convert date in correct value for database
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.props.onChangeAction(formattedDate, this.props.name);
    };

    render() {
        const {label, className, size, id, value, required, readOnly, name} = this.props;

        const formattedDate = value ? moment(value).format('L') : '';

        return (
            <div className="form-group col-sm-6">
                <div><label htmlFor={id} className={`col-sm-6 ${required}`}>{label}</label></div>
                <div className={`${size}`}>
                    <DayPickerInput
                        id={id}
                        value={formattedDate}
                        formatDate={formatDate}
                        parseDate={parseDate}
                        onDayChange={this.onDateChange}
                        dayPickerProps={{
                            showWeekNumbers: true,
                            locale: "nl",
                            firstDayOfWeek: 1,
                            localeUtils: MomentLocaleUtils,
                        }}
                        inputProps={{
                            className: `form-control input-sm ${className}` + (this.state.errorDateFormat ? ' has-error' : ''),
                            name: name,
                        }}
                        onBlur={this.validateDate}
                        required={required}
                        readOnly={readOnly}
                        placeholder={""}
                    />
                </div>
            </div>
        );
    }
    ;
}

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
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onChangeAction: PropTypes.func,
    required: PropTypes.string,
    readOnly: PropTypes.bool
};

export default InputDate;