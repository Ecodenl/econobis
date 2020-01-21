import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../../components/dataTable/DataTableHeadTitleAndSort';
import { setInvoicesSortsFilter } from '../../../../actions/invoice/InvoicesSortsActions';
import DataTableHeadTitle from '../../../../components/dataTable/DataTableHeadTitle';

const InvoicesListHead = props => {
    const setSorts = (field, order) => {
        props.setInvoicesSortsFilter(field, order);

        setTimeout(() => {
            props.fetchInvoicesData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            {props.showSelectInvoicesToSend && <th width="5%" />}
            <DataTableHeadTitleAndSort sortColumn={'number'} title={'Nummer'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'dateRequested'}
                title={'(Geplande) nota datum'}
                width={'10%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'contact'} title={'Contact'} width={'12%'} setSorts={setSorts} />
            <DataTableHeadTitle title={'Betreft'} width={'12%'} />
            <DataTableHeadTitleAndSort
                sortColumn={'daysToExpire'}
                title={'Verloopt over'}
                width={'8%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'daysLastReminder'}
                title={'Laatste herinnering'}
                width={'8%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitle title={'Bedrag incl. BTW'} width={'10%'} />
            <DataTableHeadTitleAndSort
                sortColumn={'paymentTypeId'}
                title={'Betaalwijze'}
                width={'10%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'statusId'} title={'Status'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitle title={'Substatus'} width={'10%'} />
            <DataTableHeadTitle title={'IBAN'} width={'10%'} />
            <th width="10%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setInvoicesSortsFilter: (field, order) => {
        dispatch(setInvoicesSortsFilter(field, order));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(InvoicesListHead);
