import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setAuditTrailSortsFilter } from '../../../actions/audit-trail/AuditTrailSortsActions';
import {setDocumentSortsFilter} from "../../../actions/document/DocumentSortsActions";
import DataTableHeadTitle from "../../../components/dataTable/DataTableHeadTitle";

const DocumentsListHead = (props) => {
    const setSorts = (field, order) => {
        props.setDocumentSortsFilter(field, order);

        setTimeout(() => {
            props.fetchDocumentsData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort sortColumn={'number'} title={'Document'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'date'} title={'Datum'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'filename'} title={'Bestandsnaam'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'contact'} title={'Contact'} width={'20%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'documentType'} title={'Type'} width={'20%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'documentGroup'} title={'Documentgroep'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitle title={''} width={'6%'}/>
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setDocumentSortsFilter: (field, order) => {
        dispatch(setDocumentSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(DocumentsListHead);
