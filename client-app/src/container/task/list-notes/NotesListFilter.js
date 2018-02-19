import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    setFilterNoteCreatedAt,
    setFilterNoteTypeId,
    setFilterNoteNote,
    setFilterNoteContactFullName,
    setFilterNoteDatePlannedStart,
    setFilterNoteResponsibleUserName
} from '../../../actions/task/NotesFiltersActions';
import DataTableFilterDate from "../../../components/dataTable/DataTableFilterDate";

const NotesListFilter = props => {
    const onCreatedAtChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setFilterNoteCreatedAt('');
        }else{
            props.setFilterNoteCreatedAt(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onTypeChange = (e) => {
        props.setFilterNoteTypeId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onNoteChange = (e) => {
        props.setFilterNoteNote(e.target.value);
    };

    const onContactFullNameChange = (e) => {
        props.setFilterNoteContactFullName(e.target.value);
    };

    const onDatePlannedChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setFilterNoteDatePlanned('');
        }else{
            props.setFilterNoteDatePlanned(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onResponsibleUserNameChange = (e) => {
        props.setFilterNoteResponsibleUserName(e.target.value);
    };

    return (
        <tr className="thead-filter">
            <DataTableFilterDate value={ props.filters.createdAt.data && props.filters.createdAt.data } onChangeAction={onCreatedAtChange} />
            <th>
                <select className="form-control input-sm" value={ props.filters.typeId.data } onChange={onTypeChange}>
                    <option/>
                    {
                        props.taskTypes.map((item) => {
                            return <option key={item.id } value={ item.id }>{ item.name }</option>
                        })
                    }
                </select>
            </th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.note.data} onChange={onNoteChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.contactFullName.data} onChange={onContactFullNameChange} /></th>
            <DataTableFilterDate value={ props.filters.datePlannedStart.data && props.filters.datePlannedStart.data } onChangeAction={onDatePlannedChange} />
            <th><input type="text" className="form-control input-sm" value={ props.filters.responsibleUserName.data} onChange={onResponsibleUserNameChange} /></th>
            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.notes.filters,
    taskTypes: state.systemData.taskTypes,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFilterNoteCreatedAt,
        setFilterNoteTypeId,
        setFilterNoteNote,
        setFilterNoteContactFullName,
        setFilterNoteDatePlannedStart,
        setFilterNoteResponsibleUserName
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesListFilter);