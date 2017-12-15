import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import {
    setFilterTaskCreatedAt,
    setFilterTaskName,
    setFilterTaskContactFullName,
    setFilterTaskDatePlanned,
    setFilterTaskDateStarted,
    setFilterTaskStatusId,
    setFilterTaskResponsibleUserName
} from '../../../actions/task/TasksFiltersActions';

const TasksListFilter = props => {
    const onCreatedAtChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setFilterTaskCreatedAt('');
        }else{
            props.setFilterTaskCreatedAt(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onNameChange = (e) => {
        props.setFilterTaskName(e.target.value);
    };

    const onContactFullNameChange = (e) => {
        props.setFilterTaskContactFullName(e.target.value);
    };

    const onDatePlannedChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setFilterTaskDatePlanned('');
        }else{
            props.setFilterTaskDatePlanned(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onDateStartedChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setFilterTaskDateStarted('');
        }else{
            props.setFilterTaskDateStarted(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onStatusChange = (e) => {
        props.setFilterTaskStatusId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onResponsibleUserNameChange = (e) => {
        props.setFilterTaskResponsibleUserName(e.target.value);
    };

    return (
        <tr className="thead-filter">
            <th className="DayPicker-overflow hidden-xs hidden-sm">
                <DayPickerInput value={ props.filters.createdAt.data && moment(props.filters.createdAt.data).format('DD-MM-Y') } onDayChange={onCreatedAtChange} />
            </th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.name.data} onChange={onNameChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.contactFullName.data} onChange={onContactFullNameChange} /></th>
            <th className="DayPicker-overflow hidden-xs hidden-sm">
                <DayPickerInput value={ props.filters.datePlanned.data && moment(props.filters.datePlanned.data).format('DD-MM-Y') } onDayChange={onDatePlannedChange} />
            </th>
            <th className="DayPicker-overflow hidden-xs hidden-sm">
                <DayPickerInput value={ props.filters.dateStarted.data && moment(props.filters.dateStarted.data).format('DD-MM-Y') } onDayChange={onDateStartedChange} />
            </th>
            <th>
                <select className="form-control input-sm" value={ props.filters.statusId.data } onChange={onStatusChange}>
                    <option/>
                    {
                        props.taskStatuses.map((taskStatus) => {
                            return <option key={taskStatus.id } value={ taskStatus.id }>{ taskStatus.name }</option>
                        })
                    }
                </select>
            </th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.responsibleUserName.data} onChange={onResponsibleUserNameChange} /></th>
            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.tasksFilters,
    taskStatuses: state.systemData.taskStatuses,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFilterTaskCreatedAt,
        setFilterTaskName,
        setFilterTaskContactFullName,
        setFilterTaskDatePlanned,
        setFilterTaskDateStarted,
        setFilterTaskStatusId,
        setFilterTaskResponsibleUserName
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksListFilter);