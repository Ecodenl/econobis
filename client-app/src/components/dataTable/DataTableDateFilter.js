import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';

moment.locale('nl');

class DataTableDateFilter extends Component {

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
        const {className, id, value, readOnly, name} = this.props;

        const formattedDate = value ? moment(value).format('L') : '';

        return (
            <div className={'DataTableDateFilter'} >
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
                            onBlur: this.validateDate,
                        }}
                        readOnly={readOnly}
                        placeholder={""}
                    />
            </div>
        );
    }
    ;
}

DataTableDateFilter.defaultProps = {
    className: '',
    readOnly: false,
    value: null,
};

DataTableDateFilter.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onChangeAction: PropTypes.func,
    readOnly: PropTypes.bool
};

export default DataTableDateFilter;