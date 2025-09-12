import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import { nl } from 'react-day-picker/locale';
import moment from 'moment';
import 'moment/locale/nl';

moment.locale('nl');

const DataTableFilterDateStartEndTwoRows = ({
    className,
    startDate,
    endDate,
    onChangeActionStart,
    onChangeActionEnd,
    placeholder,
}) => {
    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);

    const startInputRef = useRef(null);
    const endInputRef = useRef(null);
    const startPopRef = useRef(null);
    const endPopRef = useRef(null);

    const startStr = startDate ? moment(startDate).format('DD-MM-YYYY') : '';
    const endStr = endDate ? moment(endDate).format('DD-MM-YYYY') : '';

    useEffect(() => {
        const onDocClick = e => {
            if (openStart) {
                const pop = startPopRef.current,
                    inp = startInputRef.current;
                if (pop && !pop.contains(e.target) && inp && !inp.contains(e.target)) setOpenStart(false);
            }
            if (openEnd) {
                const pop = endPopRef.current,
                    inp = endInputRef.current;
                if (pop && !pop.contains(e.target) && inp && !inp.contains(e.target)) setOpenEnd(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [openStart, openEnd]);

    const onStartSelect = date => {
        if (date) {
            onChangeActionStart && onChangeActionStart(date);
            if (startInputRef.current) startInputRef.current.value = moment(date).format('DD-MM-YYYY');
        } else {
            onChangeActionStart && onChangeActionStart(null);
            if (startInputRef.current) startInputRef.current.value = '';
        }
        setOpenStart(false);
    };

    const onEndSelect = date => {
        if (date) {
            onChangeActionEnd && onChangeActionEnd(date);
            if (endInputRef.current) endInputRef.current.value = moment(date).format('DD-MM-YYYY');
        } else {
            onChangeActionEnd && onChangeActionEnd(null);
            if (endInputRef.current) endInputRef.current.value = '';
        }
        setOpenEnd(false);
    };

    const onStartBlur = e => {
        const m = moment(e.target.value, 'DD-MM-YYYY', true);
        if (m.isValid()) onChangeActionStart && onChangeActionStart(m.toDate());
        else if (e.target.value === '') onChangeActionStart && onChangeActionStart(null);
    };

    const onEndBlur = e => {
        const m = moment(e.target.value, 'DD-MM-YYYY', true);
        if (m.isValid()) onChangeActionEnd && onChangeActionEnd(m.toDate());
        else if (e.target.value === '') onChangeActionEnd && onChangeActionEnd(null);
    };

    return (
        <th className={`DayPicker-overflow ${className}`} style={{ position: 'relative' }}>
            {/* Start */}
            <div style={{ position: 'relative' }}>
                <input
                    ref={startInputRef}
                    type="text"
                    className="form-control input-sm"
                    placeholder={placeholder || 'Van'}
                    defaultValue={startStr}
                    onFocus={() => setOpenStart(true)}
                    onClick={() => setOpenStart(true)}
                    onBlur={onStartBlur}
                    autoComplete="off"
                />
                {openStart && (
                    <div
                        ref={startPopRef}
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
                            selected={startStr ? moment(startStr, 'DD-MM-YYYY').toDate() : undefined}
                            onSelect={onStartSelect}
                        />
                    </div>
                )}
            </div>

            <br />

            {/* End */}
            <div style={{ position: 'relative' }}>
                <input
                    ref={endInputRef}
                    type="text"
                    className="form-control input-sm"
                    placeholder={placeholder || 'tot'}
                    defaultValue={endStr}
                    onFocus={() => setOpenEnd(true)}
                    onClick={() => setOpenEnd(true)}
                    onBlur={onEndBlur}
                    autoComplete="off"
                />
                {openEnd && (
                    <div
                        ref={endPopRef}
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
                            selected={endStr ? moment(endStr, 'DD-MM-YYYY').toDate() : undefined}
                            onSelect={onEndSelect}
                        />
                    </div>
                )}
            </div>
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
    onChangeActionStart: PropTypes.func,
    onChangeActionEnd: PropTypes.func,
    placeholder: PropTypes.string,
};

export default DataTableFilterDateStartEndTwoRows;
