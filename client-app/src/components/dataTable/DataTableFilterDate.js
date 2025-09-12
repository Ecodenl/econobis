import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import { nl } from 'react-day-picker/locale';
import moment from 'moment';
import 'moment/locale/nl';

moment.locale('nl');

const DataTableFilterDate = ({ className, value, onChangeAction, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const popoverRef = useRef(null);

    const formatted = value ? moment(value).format('DD-MM-YYYY') : '';

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

    const openCalendar = () => setIsOpen(true);

    const onSelect = date => {
        if (date) {
            // houd dezelfde contract aan als DayPickerInput: geef de Date door
            onChangeAction && onChangeAction(date);
            if (inputRef.current) inputRef.current.value = moment(date).format('DD-MM-YYYY');
        } else {
            onChangeAction && onChangeAction(null);
            if (inputRef.current) inputRef.current.value = '';
        }
        setIsOpen(false);
    };

    // optioneel: als men handmatig typt en verlaat
    const onBlur = e => {
        const str = e.target.value;
        const m = moment(str, 'DD-MM-YYYY', true);
        if (m.isValid()) {
            onChangeAction && onChangeAction(m.toDate());
        } else if (str === '') {
            onChangeAction && onChangeAction(null);
        }
    };

    return (
        <th className={`DayPicker-overflow ${className}`} style={{ position: 'relative' }}>
            <input
                ref={inputRef}
                type="text"
                className="form-control input-sm"
                placeholder={placeholder || ''}
                defaultValue={formatted}
                onFocus={openCalendar}
                onClick={openCalendar}
                onBlur={onBlur}
                autoComplete="off"
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
                        selected={formatted ? moment(formatted, 'DD-MM-YYYY').toDate() : undefined}
                        onSelect={onSelect}
                    />
                </div>
            )}
        </th>
    );
};

DataTableFilterDate.defaultProps = {
    className: '',
    value: null,
    placeholder: '',
};

DataTableFilterDate.propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChangeAction: PropTypes.func,
    placeholder: PropTypes.string,
};

export default DataTableFilterDate;
