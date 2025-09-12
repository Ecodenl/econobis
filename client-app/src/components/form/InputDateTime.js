import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'react-bootstrap-time-picker';
import moment from 'moment';
import { DayPicker } from 'react-day-picker';
import { nl } from 'react-day-picker/locale';
import 'moment/locale/nl';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const InputDateTime = props => {
    const {
        className,
        divSize,
        sizeDate,
        sizeTime,
        label,
        id,
        name,
        value,
        onChangeActionDate,
        onChangeActionTime,
        readOnly,
        required,
        start,
        end,
        step,
        textToolTip,
        error,
        errorMessage,
        disabledBefore,
        disabledAfter,
        nullable,
        nullableLabel,
    } = props;

    const [errorDateFormat, setErrorDateFormat] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const popoverRef = useRef(null);

    // init locale
    moment.locale('nl');

    // init checkbox (onbekend)
    const [nullableChecked, setNullableChecked] = useState(value == '00:00');

    // map disabledBefore/After naar DayPicker v9
    const disabled = {};
    if (disabledBefore) disabled.before = new Date(disabledBefore);
    if (disabledAfter) disabled.after = new Date(disabledAfter);

    const formattedDate = value ? moment(value).format('DD-MM-YYYY') : '';
    const formattedTime = value ? moment(value).format('HH:mm') : '';

    useEffect(() => {
        const onDocClick = e => {
            if (!isOpen) return;
            const pop = popoverRef.current;
            const inp = inputRef.current;
            if (pop && !pop.contains(e.target) && inp && !inp.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [isOpen]);

    const openCalendar = () => {
        if (!readOnly) setIsOpen(true);
    };

    const validateDate = event => {
        const str = event.target.value;
        const date = moment(str, 'DD-MM-YYYY', true);
        let invalid = false;

        if (!date.isValid() && str !== '') invalid = true;
        if (!invalid && str !== '') {
            if (disabledBefore && date.isBefore(disabledBefore)) invalid = true;
            if (disabledAfter && date.isAfter(disabledAfter)) invalid = true;
        }
        setErrorDateFormat(invalid);
    };

    const onInputBlur = e => {
        validateDate(e);
        const str = e.target.value;
        const date = moment(str, 'DD-MM-YYYY', true);

        if (date.isValid()) {
            let invalid = false;
            if (disabledBefore && date.isBefore(disabledBefore)) invalid = true;
            if (disabledAfter && date.isAfter(disabledAfter)) invalid = true;

            if (!invalid) {
                onChangeActionDate && onChangeActionDate(date.format('Y-MM-DD'), name);
            }
        }
    };

    const onDateSelect = date => {
        if (!date) {
            setErrorDateFormat(false);
            return;
        }
        const m = moment(date);
        let invalid = false;
        if (disabledBefore && m.isBefore(disabledBefore)) invalid = true;
        if (disabledAfter && m.isAfter(disabledAfter)) invalid = true;

        if (!invalid) {
            onChangeActionDate && onChangeActionDate(m.format('Y-MM-DD'), name);
            if (inputRef.current) inputRef.current.value = m.format('DD-MM-YYYY');
            setErrorDateFormat(false);
            setIsOpen(false);
        } else {
            setErrorDateFormat(true);
        }
    };

    const onTimeChange = timeInSeconds => {
        const hhmm = moment('1900-01-01 00:00:00')
            .add(timeInSeconds, 'seconds')
            .format('HH:mm');
        onChangeActionTime && onChangeActionTime(hhmm, name);
    };

    const handleChangeNullableChecked = e => {
        const checked = e.target.checked;
        setNullableChecked(checked);
        onChangeActionTime && onChangeActionTime(checked ? '00:00' : '08:00', name);
    };

    return (
        <div className={`form-group ${divSize}`}>
            <label htmlFor={id} className={`col-sm-6 ${required}`}>
                {label}
            </label>

            {/* Datum */}
            <div className={sizeDate} style={{ position: 'relative' }}>
                <input
                    ref={inputRef}
                    id={id}
                    name={name}
                    type="text"
                    className={`form-control input-sm ${className}${errorDateFormat || error ? ' has-error' : ''}`}
                    placeholder=""
                    defaultValue={formattedDate}
                    onFocus={openCalendar}
                    onClick={openCalendar}
                    onBlur={onInputBlur}
                    autoComplete="off"
                    readOnly={readOnly}
                    disabled={readOnly}
                    required={!!required}
                />
                {isOpen && (
                    <div
                        ref={popoverRef}
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
                            onSelect={onDateSelect}
                            disabled={disabled}
                        />
                    </div>
                )}
            </div>

            {/* Tijd */}
            <div className={sizeTime}>
                {nullable && (
                    <label style={{ display: 'block', marginBottom: 6 }}>
                        <input
                            type="checkbox"
                            name="nullableChecked"
                            checked={nullableChecked}
                            onChange={handleChangeNullableChecked}
                            title={nullableChecked ? 'Vink uit: tijdstip zetten' : 'Vink aan: tijdstip onbekend'}
                        />{' '}
                        {nullableLabel}
                    </label>
                )}

                {nullableChecked ? (
                    <span>Onbekend</span>
                ) : readOnly ? (
                    <input name={name} value={formattedTime} className="form-control input-sm" readOnly disabled />
                ) : (
                    <TimePicker
                        name={name}
                        value={formattedTime}
                        onChange={onTimeChange}
                        start={start}
                        end={end}
                        step={step}
                        format={24}
                        className="input-sm"
                    />
                )}
            </div>

            {/* Tooltip + fouten */}
            <div className="col-sm-1">
                {textToolTip && (
                    <>
                        <FaInfoCircle color="blue" size="15px" data-tip={textToolTip} data-for={`tooltip-${name}`} />
                        <ReactTooltip
                            id={`tooltip-${name}`}
                            effect="float"
                            place="right"
                            multiline
                            aria-haspopup="true"
                        />
                    </>
                )}
            </div>

            {(error || errorDateFormat) && (
                <div className="col-sm-offset-6 col-sm-6">
                    <span className="has-error-message">
                        {' '}
                        {error ? errorMessage : 'Ongeldige datum of buiten toegestane range.'}
                    </span>
                </div>
            )}
        </div>
    );
};

InputDateTime.defaultProps = {
    className: '',
    divSize: 'col-sm-6',
    sizeDate: 'col-sm-3',
    sizeTime: 'col-sm-2',
    required: '',
    readOnly: false,
    value: null,
    name: '',
    textToolTip: '',
    error: false,
    errorMessage: '',
    disabledBefore: null,
    disabledAfter: null,
    start: '08:00',
    end: '23:00',
    step: 15,
    nullable: false,
    nullableLabel: '',
    nullableChecked: false,
};

InputDateTime.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    divSize: PropTypes.string,
    sizeDate: PropTypes.string,
    sizeTime: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string]),
    onChangeActionDate: PropTypes.func,
    onChangeActionTime: PropTypes.func,
    start: PropTypes.string,
    end: PropTypes.string,
    step: PropTypes.number,
    readOnly: PropTypes.bool,
    textToolTip: PropTypes.string,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    disabledBefore: PropTypes.string, // 'YYYY-MM-DD'
    disabledAfter: PropTypes.string,
    nullable: PropTypes.bool,
    nullableLabel: PropTypes.string,
    nullableChecked: PropTypes.bool,
};

export default InputDateTime;
