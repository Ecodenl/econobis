import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';
moment.locale('nl');

const DataTableFilterDate = props => {
    const { className, value, onChangeAction } = props;

    const formattedDate = value
        ? moment(value).format('L')
        : '';

    return (
        <th className={`DayPicker-overflow ${className}`}>
            <DayPickerInput
                value={ formattedDate }
                onDayChange={onChangeAction}
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                    showWeekNumbers: true,
                    locale: "nl",
                    firstDayOfWeek: 1,
                    localeUtils: MomentLocaleUtils,
                }}
                inputProps={{
                    className: 'form-control input-sm',
                }}
                placeholder={""}
            />
        </th>
    );
};

DataTableFilterDate.defaultProps = {
    className: '',
    value: null,
};

DataTableFilterDate.propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onChangeAction: PropTypes.func,
};

export default DataTableFilterDate;