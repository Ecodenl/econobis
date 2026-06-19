import React from 'react';
import { connect } from 'react-redux';
import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setOpportunitiesSortsFilter } from '../../../actions/opportunity/OpportunitiesSortsActions';

const OpportunitiesListHead = props => {
    const setSorts = (field, order) => {
        props.setOpportunitiesSortsFilter(field, order);

        setTimeout(() => {
            props.fetchOpportunitiesData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            {props.showCheckbox ? <th width="3%" /> : null}
            <DataTableHeadTitleAndSort sortColumn={'number'} title={'Nummer'} width={'6%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'createdAt'} title={'Datum'} width={'6%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'desiredDate'}
                title={'Datum Uitvoering'}
                width={'6%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'name'} title={'Naam'} width={'11%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'address'} title={'Adres'} width={'11%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'postalCode'} title={'Postcode'} width={'5%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'measureCategory'}
                title={'Maatregel categorie'}
                width={'9%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'measureName'}
                title={'Maatregel specifiek'}
                width={'12%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'campaign'} title={'Campagne'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'areaName'} title={'Buurt'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'statusId'} title={'Status kans'} width={'5%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'amountOfQuotationRequests'}
                title={'Aantal kansacties'}
                width={'5%'}
                setSorts={setSorts}
            />
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
