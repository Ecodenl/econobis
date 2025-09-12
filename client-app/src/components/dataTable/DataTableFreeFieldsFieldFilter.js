import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import { nl } from 'react-day-picker/locale';
import moment from 'moment';
import 'moment/locale/nl';

class DataTableFreeFieldsFieldFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            freeFieldFormatType: '',
            optionsToSelect: [],
            value: [],
            optionKeyAsId: false,
            yesNoOptions: [
                { id: 0, name: 'Nee' },
                { id: 1, name: 'Ja' },
            ],
            isOpen: false,
        };
        this.inputRef = React.createRef();
        this.popoverRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.freeFieldFormatType !== prevProps.freeFieldFormatType) {
            this.setState({
                ...this.state,
                optionsToSelect: [],
                freeFieldFormatType: this.props.freeFieldFormatType,
            });
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleDocClick);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleDocClick);
    }

    handleDocClick = e => {
        if (!this.state.isOpen) return;
        const pop = this.popoverRef.current;
        const inp = this.inputRef.current;
        if (pop && !pop.contains(e.target) && inp && !inp.contains(e.target)) {
            this.setState({ isOpen: false });
        }
    };

    openCalendar = () => {
        if (!this.props.readOnly) this.setState({ isOpen: true });
    };

    onDateSelect = date => {
        const { handleInputChangeDate, name } = this.props;
        if (date) {
            if (this.inputRef.current) {
                this.inputRef.current.value = moment(date).format('DD-MM-YYYY');
            }
            handleInputChangeDate && handleInputChangeDate(date, name);
        } else {
            if (this.inputRef.current) this.inputRef.current.value = '';
            handleInputChangeDate && handleInputChangeDate(null, name);
        }
        this.setState({ isOpen: false });
    };

    onDateBlur = e => {
        const { handleInputChangeDate, name } = this.props;
        const str = e.target.value;
        const m = moment(str, 'DD-MM-YYYY', true);
        if (m.isValid()) {
            handleInputChangeDate && handleInputChangeDate(m.toDate(), name);
        } else if (str === '') {
            handleInputChangeDate && handleInputChangeDate(null, name);
        }
    };

    render() {
        const { id, name, value, handleInputChange, readOnly } = this.props;
        const { freeFieldFormatType, yesNoOptions, isOpen } = this.state;

        const isDateField = freeFieldFormatType === 'date' || freeFieldFormatType === 'datetime';
        const formattedDate = isDateField && value ? moment(value).format('DD-MM-YYYY') : '';

        return (
            <>
                {!freeFieldFormatType ? (
                    <span>Kies eerst een vrij veld</span>
                ) : freeFieldFormatType === 'boolean' ? (
                    <select
                        className="form-control input-sm"
                        id={id}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        disabled={readOnly}
                    >
                        {yesNoOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                ) : isDateField ? (
                    <div className="DataTableDateFilter" style={{ position: 'relative' }}>
                        <input
                            ref={this.inputRef}
                            id={id}
                            name={name}
                            type="text"
                            className="form-control input-sm"
                            placeholder="Kies een datum"
                            defaultValue={formattedDate}
                            onFocus={this.openCalendar}
                            onClick={this.openCalendar}
                            onBlur={this.onDateBlur}
                            autoComplete="off"
                            readOnly={readOnly}
                            disabled={readOnly}
                        />
                        {isOpen && (
                            <div
                                ref={this.popoverRef}
                                style={{
                                    position: 'absolute',
                                    zIndex: 1000,
                                    background: '#fff',
                                    boxShadow: '0 6px 24px rgba(0,0,0,.2)',
                                    borderRadius: 8,
                                    marginTop: 6,
                                }}
                            >
                                <DayPicker
                                    mode="single"
                                    locale={nl}
                                    showWeekNumber
                                    selected={formattedDate ? moment(formattedDate, 'DD-MM-YYYY').toDate() : undefined}
                                    onSelect={this.onDateSelect}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <input
                        className="form-control input-sm"
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
    handleInputChange: PropTypes.func,
    handleInputChangeDate: PropTypes.func,
    readOnly: PropTypes.bool,
    freeFieldFormatType: PropTypes.string,
};

export default DataTableFreeFieldsFieldFilter;
