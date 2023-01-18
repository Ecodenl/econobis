import React from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'react-bootstrap-time-picker';
import moment from 'moment';

const InputTime = props => {
    const { label, size, id, name, value, onChangeAction, start, end, step, readOnly } = props;

    const onTimeChange = timeInSeconds => {
        // Workaround for converting seconds to HH:mm:ss
        const formattedTime = moment('1900-01-01 00:00:00')
            .add(timeInSeconds, 'seconds')
            .format('HH:mm:ss');

        onChangeAction(formattedTime, name);
    };

    return (
        <div className="form-group col-sm-6">
            <label htmlFor={id} className={'col-sm-6'}>
                {label}
            </label>
            <div className={`${size}`}>
                {!readOnly ? (
                        <TimePicker
                            name={name}
                            value={value}
                            onChange={onTimeChange}
                            start={start}
                            end={end}
                            step={step}
                            format={24}
                            className={'input-sm'}
                        />
                    )
                    : (
                        <input
                            name={name}
                            value={value}
                            className={'form-control input-sm'}
                            readOnly={true}
                            disabled={true}
                        />
                    )
                }
            </div>
        </div>
    );
};

InputTime.defaultProps = {
    className: '',
    size: 'col-sm-6',
    value: '',
    start: '08:00',
    end: '23:00',
    step: 15,
    readOnly: false,
};

InputTime.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChangeAction: PropTypes.func,
    start: PropTypes.string,
    end: PropTypes.string,
    step: PropTypes.number,
    readOnly: PropTypes.bool,
};

export default InputTime;
