import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';
moment.locale('nl');

const DataTableFilterDateStartEndTwoRows = props => {
    const { className, startDate, endDate, onChangeActionStart, onChangeActionEnd, placeholder } = props;

    const formattedStartDate = startDate ? moment(startDate).format('L') : '';
    const formattedEndDate = endDate ? moment(endDate).format('L') : '';

    return (
        <th className={`DayPicker-overflow ${className}`}>
            <DayPickerInput
                value={formattedStartDate}
                onDayChange={onChangeActionStart}
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                    showWeekNumbers: true,
                    locale: 'nl',
                    firstDayOfWeek: 1,
                    localeUtils: MomentLocaleUtils,
                }}
                inputProps={{
                    className: 'form-control input-sm',
                    placeholder: 'Van',
                }}
                placeholder={'Van'}
            />
            <br />
            <DayPickerInput
                value={formattedEndDate}
                onDayChange={onChangeActionEnd}
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                    showWeekNumbers: true,
                    locale: 'nl',
                    firstDayOfWeek: 1,
                    localeUtils: MomentLocaleUtils,
                }}
                inputProps={{
                    className: 'form-control input-sm',
                    placeholder: 'tot',
                }}
                placeholder={'tot'}
            />
        </th>
    );
};

DataTableFilterDateStartEndTwoRows.defaultProps = {
    className: '',
    startDate: null,
    endDate: null,
    placeholder: '',
};

DataTableFilterDateStartEndTwoRows.propTypes = {
    className: PropTypes.string,
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChangeAction: PropTypes.func,
    placeholder: PropTypes.string,
};

export default DataTableFilterDateStartEndTwoRows;
