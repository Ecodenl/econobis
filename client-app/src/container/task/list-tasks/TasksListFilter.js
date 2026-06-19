import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    setFilterTaskCreatedAt,
    setFilterTaskTypeId,
    setFilterTaskNote,
    setFilterTaskContactFullName,
    setFilterTaskDatePlannedStart,
    setFilterTaskResponsibleName,
} from '../../../actions/task/TasksFiltersActions';
import DataTableFilterDate from '../../../components/dataTable/DataTableFilterDate';

const TasksListFilter = props => {
    const onCreatedAtChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterTaskCreatedAt('');
        } else {
            props.setFilterTaskCreatedAt(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onTypeChange = e => {
        props.setFilterTaskTypeId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onNoteChange = e => {
        props.setFilterTaskNote(e.target.value);
    };

    const onContactFullNameChange = e => {
        props.setFilterTaskContactFullName(e.target.value);
    };

    const onDatePlannedChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterTaskDatePlannedStart('');
        } else {
            props.setFilterTaskDatePlannedStart(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onResponsibleNameChange = e => {
        props.setFilterTaskResponsibleName(e.target.value);
    };

    return (
        <tr className="thead-filter">
            {props.showSelectTasks && (
                <th>
                    <input type="checkbox" onChange={props.toggleCheckedAll} />
                </th>
            )}
            <DataTableFilterDate
                value={props.filters.createdAt.data && props.filters.createdAt.data}
                onChangeAction={onCreatedAtChange}
            />
            <th>
                <select className="form-control input-sm" value={props.filters.typeId.data} onChange={onTypeChange}>
                    <option />
                    {props.taskTypes.map(item => {
                        return (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.note.data}
                    onChange={onNoteChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.contactFullName.data}
                    onChange={onContactFullNameChange}
                />
            </th>
            <DataTableFilterDate
                value={props.filters.datePlannedStart.data && props.filters.datePlannedStart.data}
                onChangeAction={onDatePlannedChange}
            />
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.responsibleName.data}
                    onChange={onResponsibleNameChange}
                />
            </th>
            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.tasks.filters,
    taskTypes: state.systemData.taskTypes,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setFilterTaskCreatedAt,
            setFilterTaskTypeId,
            setFilterTaskNote,
            setFilterTaskContactFullName,
            setFilterTaskDatePlannedStart,
            setFilterTaskResponsibleName,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksListFilter);
