import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
// import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import { setContactsSortsFilter } from '../../../actions/contact/ContactsSortsActions';

const ContactsListHead = props => {
    const setSorts = (field, order) => {
        props.setContactsSortsFilter(field, order);

        setTimeout(() => {
            props.fetchContactsData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            {props.showCheckbox || props.showCheckboxMerge ? <th width="3%" /> : null}
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs'}
                sortColumn={'number'}
                title={'#'}
                width={'5%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs hidden-sm'}
                sortColumn={'typeName'}
                title={'Type'}
                width={'7%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'fullName'} title={'Naam'} width={'11%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs'}
                sortColumn={'streetAndNumber'}
                title={'Adres'}
                width={'12%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs'}
                sortColumn={'postalCode'}
                title={'Postcode'}
                width={'7%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs'}
                sortColumn={'city'}
                title={'Plaats'}
                width={'10%'}
                setSorts={setSorts}
            />
            {/*<DataTableHeadTitle*/}
            {/*    RowClassName={'hidden-xs'}*/}
            {/*    sortColumn={'areaName'}*/}
            {/*    title={'Buurt'}*/}
            {/*    width={'10%'}*/}
            {/*/>*/}
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs'}
                sortColumn={'emailAddress'}
                title={'E-mail'}
                width={'12%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'phoneNumber'} title={'Telefoon'} width={'7%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs hidden-sm'}
                sortColumn={'createdAt'}
                title={'Gemaakt op'}
                width={'8%'}
                setSorts={setSorts}
            />
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
