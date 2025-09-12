import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import { nl } from 'react-day-picker/locale';
import moment from 'moment';
import 'moment/locale/nl';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

moment.locale('nl');

class InputDate extends Component {
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
        // klik buiten popover sluit hem
        document.addEventListener('mousedown', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleDocumentClick);
    }

    handleDocumentClick = e => {
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

    validateDate = event => {
        const str = event.target.value;
        const date = moment(str, 'DD-MM-YYYY', true);
        let errorDateFormat = false;

        if (!date.isValid() && str !== '') {
            errorDateFormat = true;
        }

        const { disabledBefore, disabledAfter } = this.props;
        if (!errorDateFormat && str !== '') {
            if (disabledBefore && date.isBefore(disabledBefore)) errorDateFormat = true;
            if (disabledAfter && date.isAfter(disabledAfter)) errorDateFormat = true;
        }

        this.setState({ errorDateFormat });
    };

    onInputChange = e => {
        // alleen visueel; database-waarde wordt in onDateSelect/blur gezet via onChangeAction
        const str = e.target.value;
        // live validatie optioneel; we laten validateDate op blur doen
        // maar als je direct validatie wil, uncomment:
        // this.validateDate(e);
        // Als je bij direct typen ook onChangeAction wil aanroepen (wanneer geldig), kun je dat hier doen.
    };

    onInputBlur = e => {
        this.validateDate(e);
        const { onChangeAction, name, disabledBefore, disabledAfter } = this.props;

        const str = e.target.value;
        const date = moment(str, 'DD-MM-YYYY', true);

        if (date.isValid()) {
            let invalid = false;
            if (disabledBefore && date.isBefore(disabledBefore)) invalid = true;
            if (disabledAfter && date.isAfter(disabledAfter)) invalid = true;

            if (!invalid) {
                const formattedForDb = date.format('Y-MM-DD');
                onChangeAction && onChangeAction(formattedForDb, name);
            }
        }
    };

    onDateSelect = date => {
        const { onChangeAction, name, disabledBefore, disabledAfter } = this.props;

        let errorDateFormat = false;
        if (date) {
            const m = moment(date);
            if (disabledBefore && m.isBefore(disabledBefore)) errorDateFormat = true;
            if (disabledAfter && m.isAfter(disabledAfter)) errorDateFormat = true;

            const formattedForDb = m.format('Y-MM-DD');
            if (!errorDateFormat) {
                onChangeAction && onChangeAction(formattedForDb, name);
                // input tonen als DD-MM-YYYY
                if (this.inputRef.current) {
                    this.inputRef.current.value = m.format('DD-MM-YYYY');
                }
                this.setState({ errorDateFormat: false, isOpen: false });
                return;
            }
        }

        this.setState({ errorDateFormat: true });
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
            textToolTip,
            error,
            errorMessage,
            disabledBefore,
            disabledAfter,
            placeholder,
        } = this.props;

        // waarde uit DB ('Y-MM-DD' of Date) → tonen als 'DD-MM-YYYY'
        const formattedDate = value ? moment(value).format('DD-MM-YYYY') : '';

        // DayPicker v9: disabled = { before: Date, after: Date }
        const disabled = {};
        if (disabledBefore) disabled.before = new Date(disabledBefore);
        if (disabledAfter) disabled.after = new Date(disabledAfter);

        // v9: showWeekNumber direct als prop; weekstart via locale (nl = maandag)
        const dayPicker = (
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
                    disabled={disabled}
                />
            </div>
        );

        return (
            <div className={`form-group ${divSize}`} style={{ position: 'relative' }}>
                <div>
                    <label htmlFor={id} className={`col-sm-6 ${required}`}>
                        {label}
                    </label>
                </div>
                <div className={size}>
                    <input
                        ref={this.inputRef}
                        id={id}
                        name={name}
                        type="text"
                        className={
                            `form-control input-sm ${className}` +
                            (this.state.errorDateFormat || error ? ' has-error' : '')
                        }
                        placeholder={placeholder || 'DD-MM-YYYY'}
                        defaultValue={formattedDate}
                        onFocus={this.openCalendar}
                        onClick={this.openCalendar}
                        onChange={this.onInputChange}
                        onBlur={this.onInputBlur}
                        autoComplete="off"
                        readOnly={readOnly}
                        disabled={readOnly}
                        required={!!required}
                    />
                    {this.state.isOpen && dayPicker}
                </div>

                {textToolTip && (
                    <div className="col-sm-1">
                        <FaInfoCircle
                            color={'blue'}
                            size={'15px'}
                            data-tip={textToolTip}
                            data-for={`tooltip-${name}`}
                        />
                        <ReactTooltip
                            id={`tooltip-${name}`}
                            effect="float"
                            place="right"
                            multiline
                            aria-haspopup="true"
                        />
                    </div>
                )}

                {(error || this.state.errorDateFormat) && (
                    <div className="col-sm-offset-6 col-sm-6">
                        <span className="has-error-message">
                            {' '}
                            {error ? errorMessage : 'Ongeldige datum of buiten toegestane range.'}
                        </span>
                    </div>
                )}
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
    name: '',
    textToolTip: '',
    error: false,
    errorMessage: '',
    disabledBefore: null,
    disabledAfter: null,
    placeholder: '',
};

InputDate.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    divSize: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    textToolTip: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChangeAction: PropTypes.func,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    readOnly: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    disabledBefore: PropTypes.string, // 'YYYY-MM-DD' zoals in je oude code
    disabledAfter: PropTypes.string,
    placeholder: PropTypes.string,
};

export default InputDate;
