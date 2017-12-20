import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../components/dataTable/DataTableHeadTitleAndSort';
import { setContactsSortsFilter } from '../../actions/ContactsSortsActions';

const ContactsListHead = (props) => {
    const setSorts = (field, order) => {
        props.setContactsSortsFilter(field, order);

        setTimeout(() => {
            props.refreshContactsData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            { (props.showCheckbox ? <th width="3%" /> : null) }
            <DataTableHeadTitleAndSort RowClassName={'hidden-xs'} sortColumn={'number'} title={'#'} width={'5%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort RowClassName={'hidden-xs hidden-sm'} sortColumn={'typeName'} title={'Type'} width={'5%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'fullName'} title={'Naam'} width={'11%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort RowClassName={'hidden-xs'} sortColumn={'streetAndNumber'} title={'Adres'} width={'12%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort RowClassName={'hidden-xs'} sortColumn={'postalCode'} title={'Postcode'} width={'7%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort RowClassName={'hidden-xs'} sortColumn={'city'} title={'Woonplaats'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort RowClassName={'hidden-xs'} sortColumn={'emailAddress'} title={'Email'} width={'12%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'phoneNumber'} title={'Telefoon'} width={'7%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort RowClassName={'hidden-xs hidden-sm'} sortColumn={'statusName'} title={'Status'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort RowClassName={'hidden-xs hidden-sm'} sortColumn={'createdAt'} title={'Gemaakt op'} width={'8%'} setSorts={setSorts} />
            <th width="3%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setContactsSortsFilter: (field, order) => {
        dispatch(setContactsSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(ContactsListHead);
