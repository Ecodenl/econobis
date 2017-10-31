import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitle from '../../components/dataTable/DataTableHeadTitle';
import { setSortsFilter } from '../../actions/ContactsSortsActions';

const ContactsListHead = (props) => {
    const setSorts = (field, order) => {
        props.setSortsFilter(field, order);

        setTimeout(() => {
            props.refreshContactsData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            { (props.showCheckbox ? <th width="3%" /> : null) }
            <DataTableHeadTitle RowClassName={'hidden-xs'} sortColumn={'number'} title={'#'} width={'3%'} setSorts={setSorts} />
            <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} sortColumn={'typeName'} title={'Type'} width={'5%'} setSorts={setSorts} />
            <DataTableHeadTitle sortColumn={'fullName'} title={'Naam'} width={'11%'} setSorts={setSorts} />
            <DataTableHeadTitle RowClassName={'hidden-xs'} sortColumn={'streetAndNumber'} title={'Adres'} width={'12%'} setSorts={setSorts} />
            <DataTableHeadTitle RowClassName={'hidden-xs'} sortColumn={'postalCode'} title={'Postcode'} width={'7%'} setSorts={setSorts} />
            <DataTableHeadTitle RowClassName={'hidden-xs'} sortColumn={'city'} title={'Woonplaats'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitle RowClassName={'hidden-xs'} sortColumn={'emailAddress'} title={'Email'} width={'12%'} setSorts={setSorts} />
            <DataTableHeadTitle sortColumn={'phoneNumber'} title={'Telefoon'} width={'7%'} setSorts={setSorts} />
            <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} sortColumn={'status'} title={'Status'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitle RowClassName={'hidden-xs hidden-sm'} sortColumn={'createdAt'} title={'Gemaakt op'} width={'10%'} setSorts={setSorts} />
            <th width="3%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setSortsFilter: (field, order) => {
        dispatch(setSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(ContactsListHead);
