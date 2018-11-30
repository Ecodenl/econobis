import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setOpportunitiesSortsFilter } from '../../../actions/opportunity/OpportunitiesSortsActions';
import DataTableHeadTitle from "../../../components/dataTable/DataTableHeadTitle";

const OpportunitiesListHead = (props) => {
    const setSorts = (field, order) => {
        props.setOpportunitiesSortsFilter(field, order);

        setTimeout(() => {
            props.fetchOpportunitiesData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort sortColumn={'number'} title={'Nummer'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'createdAt'} title={'Datum'} width={'20%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'name'} title={'Naam'} width={'20%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'measureCategory'} title={'Maatregel categorie'} width={'17%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'campaign'} title={'Campagne'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'statusId'} title={'Status'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'amountOfQuotationRequests'} title={'Aantal offertes'} width={'7%'} setSorts={setSorts} />
            <th width="6%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setOpportunitiesSortsFilter: (field, order) => {
        dispatch(setOpportunitiesSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(OpportunitiesListHead);
