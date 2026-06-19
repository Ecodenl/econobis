import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment/moment';

class DataTableFreeFieldsFieldFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            freeFieldFormatType: '',
            optionsToSelect: [],
            value: [],
            optionKeyAsId: false,
            yesNoOptions: [
                {
                    id: 0,
                    name: 'Nee',
                },
                {
                    id: 1,
                    name: 'Ja',
                },
            ],
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.freeFieldFormatType !== prevProps.freeFieldFormatType) {
            this.setState({ ...this.state, optionsToSelect: [], freeFieldFormatType: this.props.freeFieldFormatType });
        }
    }

    render() {
        const { id, name, value, handleInputChange, handleInputChangeDate, readOnly } = this.props;
        const { freeFieldFormatType } = this.state;
        let formattedDate = null;
        if (freeFieldFormatType === 'date' || freeFieldFormatType === 'datetime') {
            formattedDate = value ? moment(value).format('L') : '';
        }

        return (
            <>
                {!freeFieldFormatType ? (
                    <span>Kies eerst een vrij veld</span>
                ) : freeFieldFormatType === 'boolean' ? (
                    <select
                        className={`form-control input-sm`}
                        id={id}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        disabled={readOnly}
                    >
                        {this.state.yesNoOptions.map(option => {
                            return (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            );
                        })}
                    </select>
                ) : freeFieldFormatType === 'date' || freeFieldFormatType === 'datetime' ? (
                    <div className={`DataTableDateFilter`}>
                        <DayPickerInput
                            value={formattedDate}
                            onDayChange={handleInputChangeDate}
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
                                placeholder: 'Kies een datum',
                            }}
                            placeholder={''}
                        />
                    </div>
                ) : (
                    <input
                        className={'form-control input-sm'}
                        type="text"
                        id={id}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        readOnly={readOnly}
                    />
                )}
            </>
        );
    }
}

DataTableFreeFieldsFieldFilter.defaultProps = {
    className: '',
    readOnly: false,
    value: null,
};

DataTableFreeFieldsFieldFilter.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChangeAction: PropTypes.func,
    readOnly: PropTypes.bool,
};

export default DataTableFreeFieldsFieldFilter;
