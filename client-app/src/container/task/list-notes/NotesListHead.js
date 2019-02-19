import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setNotesSortsFilter } from '../../../actions/task/NotesSortsActions';

const NotesListHead = props => {
    const setSorts = (field, order) => {
        props.setNotesSortsFilter(field, order);

        setTimeout(() => {
            props.fetchNotesData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort sortColumn={'createdAt'} title={'Datum'} width={'8%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'typeName'} title={'Type taak'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'note'} title={'Taak / notitie'} width={'20%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'contactFullName'}
                title={'Contact'}
                width={'17%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'datePlannedStart'}
                title={'Datum afhandelen'}
                width={'8%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'responsibleName'}
                title={'Verantwoordelijke'}
                width={'15%'}
                setSorts={setSorts}
            />
            <th width="5%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setNotesSortsFilter: (field, order) => {
        dispatch(setNotesSortsFilter(field, order));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(NotesListHead);
