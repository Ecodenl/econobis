import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import { nl } from 'react-day-picker/locale';
import moment from 'moment';
import 'moment/locale/nl';

moment.locale('nl');

class DataTableDateFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorDateFormat: false,
            isOpen: false,
        };
        this.inputRef = React.createRef();
        this.popoverRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }

    handleOutsideClick = e => {
        if (!this.state.isOpen) return;
        const pop = this.popoverRef.current;
        const inp = this.inputRef.current;
        if (pop && !pop.contains(e.target) && inp && !inp.contains(e.target)) {
            this.setState({ isOpen: false });
        }
    };

    openCalendar = () => {
        if (!this.props.readOnly) {
            this.setState({ isOpen: true });
        }
    };

    validateDate = e => {
        const str = e.target.value;
        const date = moment(str, 'DD-MM-YYYY', true);

        this.setState({ errorDateFormat: !date.isValid() && str !== '' });
    };

    onInputBlur = e => {
        this.validateDate(e);
        const { onChangeAction, name } = this.props;

        const str = e.target.value;
        const date = moment(str, 'DD-MM-YYYY', true);

        if (date.isValid()) {
            onChangeAction && onChangeAction(date.format('Y-MM-DD'), name);
        }
    };

    onDateSelect = date => {
        const { onChangeAction, name } = this.props;
        if (date) {
            const m = moment(date);
            onChangeAction && onChangeAction(m.format('Y-MM-DD'), name);
            if (this.inputRef.current) {
                this.inputRef.current.value = m.format('DD-MM-YYYY');
            }
            this.setState({ errorDateFormat: false, isOpen: false });
        }
    };

    render() {
        const { className, id, value, readOnly, name } = this.props;
        const formattedDate = value ? moment(value).format('DD-MM-YYYY') : '';

        return (
            <div className="DataTableDateFilter" style={{ position: 'relative' }}>
                <input
                    ref={this.inputRef}
                    id={id}
                    name={name}
                    type="text"
                    className={`form-control input-sm ${className}${this.state.errorDateFormat ? ' has-error' : ''}`}
                    defaultValue={formattedDate}
                    onFocus={this.openCalendar}
                    onClick={this.openCalendar}
                    onBlur={this.onInputBlur}
                    autoComplete="off"
                    readOnly={readOnly}
                />
                {this.state.isOpen && (
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
        );
    }
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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChangeAction: PropTypes.func,
    readOnly: PropTypes.bool,
};

export default DataTableDateFilter;
