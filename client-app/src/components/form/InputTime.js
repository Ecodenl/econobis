import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'react-bootstrap-time-picker';
import moment from 'moment';

const InputTime = props => {
    const {
        label,
        size,
        id,
        name,
        value,
        onChangeAction,
        start,
        end,
        step,
        readOnly,
        nullable,
        nullableLabel,
        nullableSize,
    } = props;

    const onTimeChange = timeInSeconds => {
        // Workaround for converting seconds to HH:mm:ss
        const formattedTime = moment('1900-01-01 00:00:00')
            .add(timeInSeconds, 'seconds')
            .format('HH:mm:ss');
        onChangeAction(formattedTime, name);
    };


    const [nullableChecked, setNullableChecked] = useState(false);
    const handleChange = () => {
        setNullableChecked(!nullableChecked);
        onChangeAction('00:00', name);
    };

    console.log(nullableChecked);

    return (
        <div className="form-group col-sm-6">
            <label htmlFor={id} className={'col-sm-6'}>
                {label}
            </label>
            <div className={`${size}`}>
                {(!readOnly && !nullableChecked) ? (
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
                )}
            </div>
            {nullable ? (
                    <div className={`${nullableSize}`}>
                        <label className={'col-sm'}>
                            <input type={'checkbox'} name={'nullableChecked'} value={true} checked={nullableChecked} onChange={handleChange} />
                            &nbsp;{nullableLabel}
                        </label>
                    </div>
                ) : (
                    ''
                )
            }

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
    nullable: false,
    nullableLabel: '',
    nullableSize: 'col-sm-3',
    nullableChecked: false,
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
    nullable: PropTypes.bool,
    nullableLabel: PropTypes.string,
    nullableSize: PropTypes.string,
    nullableChecked: PropTypes.bool,
};

export default InputTime;
