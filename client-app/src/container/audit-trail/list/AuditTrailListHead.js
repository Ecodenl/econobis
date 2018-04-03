import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setAuditTrailSortsFilter } from '../../../actions/audit-trail/AuditTrailSortsActions';

const AuditTrailListHead = (props) => {
    const setSorts = (field, order) => {
        props.setAuditTrailSortsFilter(field, order);

        setTimeout(() => {
            props.fetchAuditTrailData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort sortColumn={'model'} title={'Type record'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'revisionable_id'} title={'Id'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'field'} title={'Veldnaam'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'oldValue'} title={'Oude waarde'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'newValue'} title={'Nieuwe waarde'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'changedById'} title={'Gewijzigd door'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'updatedAt'} title={'Gewijzigd op'} width={'15%'} setSorts={setSorts} />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setAuditTrailSortsFilter: (field, order) => {
        dispatch(setAuditTrailSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(AuditTrailListHead);
