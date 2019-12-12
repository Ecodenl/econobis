import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';
moment.locale('nl');
import styled from '@emotion/styled';

const DataTableFilterDateStartEnd = props => {
    const { className, startDate, endDate, onChangeActionStart, onChangeActionEnd, placeholder } = props;

    const formattedStartDate = startDate ? moment(startDate).format('L') : '';
    const formattedEndDate = endDate ? moment(endDate).format('L') : '';

    return (
        <th className={`DayPicker-overflow ${className}`}>
            <StyledWrapper>
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
                />{' '}
                -{' '}
                <span className="InputFromTo-to">
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
                </span>
            </StyledWrapper>
        </th>
    );
};

DataTableFilterDateStartEnd.defaultProps = {
    className: '',
    startDate: null,
    endDate: null,
    placeholder: '',
};

DataTableFilterDateStartEnd.propTypes = {
    className: PropTypes.string,
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChangeAction: PropTypes.func,
    placeholder: PropTypes.string,
};

export default DataTableFilterDateStartEnd;

const StyledWrapper = styled.div`
    display: flex;

    // & .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    //     background-color: #f0f8ff !important;
    //     color: #4a90e2;
    // }

    & .DayPicker-Day {
        border-radius: 0 !important;
    }
    & .DayPicker-Day--start {
        border-top-left-radius: 50% !important;
        border-bottom-left-radius: 50% !important;
    }
    & .DayPicker-Day--end {
        border-top-right-radius: 50% !important;
        border-bottom-right-radius: 50% !important;
    }
    & .DayPickerInput-Overlay {
        width: 600px;
    }
    .InputFromTo-to .DayPickerInput-Overlay {
        margin-left: -198px;
    }
`;
