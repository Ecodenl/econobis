import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setIntakesSortsFilter } from '../../../actions/intake/IntakesSortsActions';

const IntakesListHead = props => {
    const setSorts = (field, order) => {
        props.setIntakesSortsFilter(field, order);

        setTimeout(() => {
            props.refreshIntakesData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            {props.showCheckbox ? <th width="3%" /> : null}
            <DataTableHeadTitleAndSort sortColumn={'createdAt'} title={'Datum'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'fullName'} title={'Contact'} width={'20%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'address'} title={'Adres'} width={'20%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'measureRequestedId'}
                title={'Interesse'}
                width={'15%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'statusId'} title={'Status'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'campaignId'} title={'Campagne'} width={'10%'} setSorts={setSorts} />
            <th width="5%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setIntakesSortsFilter: (field, order) => {
        dispatch(setIntakesSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(IntakesListHead);
