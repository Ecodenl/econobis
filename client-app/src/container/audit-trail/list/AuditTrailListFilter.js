import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import {
    setFilterAuditTrailModel,
    setFilterAuditTrailField,
    setFilterAuditTrailOldValue,
    setFilterAuditTrailNewValue,
    setFilterAuditTrailChangedById,
    setFilterAuditTrailUpdatedAt
} from '../../../actions/audit-trail/AuditTrailFiltersActions';

const AuditTrailListFilter = props => {

    const onModelChange = (e) => {
        props.setFilterAuditTrailModel(e.target.value);
    };

    const onFieldChange = (e) => {
        props.setFilterAuditTrailField(e.target.value);
    };

    const onOldValueChange = (e) => {
        props.setFilterAuditTrailOldValue(e.target.value);
    };

    const onNewValueChange = (e) => {
        props.setFilterAuditTrailNewValue(e.target.value);
    };

    const onChangedByChangeId = (e) => {
        props.setFilterAuditTrailChangedById(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onUpdatedAtChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setFilterAuditTrailUpdatedAt('');
        }else{
            props.setFilterAuditTrailUpdatedAt(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    return (
        <tr className="thead-filter">


            <th><input type="text" className="form-control input-sm" value={ props.filters.model.data} onChange={onModelChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.field.data} onChange={onFieldChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.oldValue.data} onChange={onOldValueChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.newValue.data} onChange={onNewValueChange} /></th>

            <th>
                <select className="form-control input-sm" value={ props.filters.changedById.data } onChange={onChangedByChangeId}>
                    <option/>
                    {
                        props.users.map((user) => {
                            return <option key={user.id } value={ user.id }>{ user.fullName }</option>
                        })
                    }
                </select>
            </th>

            <th className="DayPicker-overflow hidden-xs hidden-sm">
                <DayPickerInput value={ props.filters.updatedAt.data && moment(props.filters.updatedAt.data).format('DD-MM-Y') } onDayChange={onUpdatedAtChange} />
            </th>
            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.auditTrail.filters,
    users: state.systemData.users,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFilterAuditTrailModel,
        setFilterAuditTrailField,
        setFilterAuditTrailOldValue,
        setFilterAuditTrailNewValue,
        setFilterAuditTrailChangedById,
        setFilterAuditTrailUpdatedAt
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AuditTrailListFilter);