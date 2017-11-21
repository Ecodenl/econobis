import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import {
    setFullNameFilter,
    setRegistrationFilter,
} from '../../../actions/registration/RegistrationsFiltersActions';

const RegistrationsListFilter = props => {
    const onFullNameChange = (e) => {
        props.setFullNameFilter(e.target.value);
    };

    const onRegistrationChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setRegistrationFilter('');
        }else{
            props.setRegistrationFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    return (
        <tr className="thead-filter">
            <th><input type="text" className="form-control input-sm" value={ props.filters.fullName.data} onChange={onFullNameChange} /></th>
            <th className="DayPicker-overflow hidden-xs hidden-sm">
                <DayPickerInput value={ props.filters.createdAt.data && moment(props.filters.createdAt.data).format('DD-MM-Y') } onDayChange={onRegistrationChange} />
            </th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.fullName.data} onChange={onFullNameChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.fullName.data} onChange={onFullNameChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.fullName.data} onChange={onFullNameChange} /></th>
            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.registrationsFilters,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFullNameFilter,
        setRegistrationFilter,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationsListFilter);