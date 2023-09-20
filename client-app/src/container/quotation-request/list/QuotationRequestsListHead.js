import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import { setQuotationRequestsSortsFilter } from '../../../actions/quotation-request/QuotationRequestsSortsActions';

const QuotationRequestsListHead = props => {
    const setSorts = (field, order) => {
        props.setQuotationRequestsSortsFilter(field, order);

        setTimeout(() => {
            props.refreshQuotationRequestsData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort
                sortColumn={'organisationOrCoach'}
                title={'Organisatie/Coach'}
                width={'9%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'contact'} title={'Contact'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'address'} title={'Adres'} width={'14%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'areaName'} title={'Buurt'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'measure'} title={'Maatregel'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'createdAt'} title={'Datum'} width={'7%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'datePlanned'} title={'Afspraak'} width={'7%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'dateRecorded'} title={'Opname'} width={'7%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'statusId'}
                title={'Status kansactie'}
                width={'7%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'dateReleased'}
                title={'Uitgebracht'}
                width={'7%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'campaign'} title={'Campagne'} width={'10%'} setSorts={setSorts} />
            <th width="4%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setQuotationRequestsSortsFilter: (field, order) => {
        dispatch(setQuotationRequestsSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(QuotationRequestsListHead);
