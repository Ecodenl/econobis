import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setContactGroupSortsFilter } from '../../../actions/contact/ContactGroupSortsActions';
import DataTableHeadTitle from "../../../components/dataTable/DataTableHeadTitle";

const ContactGroupsListHead = (props) => {
    const setSorts = (field, order) => {
        props.setContactGroupSortsFilter(field, order);

        setTimeout(() => {
            props.fetchContactGroupsData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort sortColumn={'name'} title={'Name'} width={'40%'} setSorts={setSorts} />
            <DataTableHeadTitle title={'Aantal leden'} width={'20%'}/>
            <DataTableHeadTitle title={'Status'} width={'35%'}/>
            <DataTableHeadTitle title={''} width={'5%'}/>
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setContactGroupSortsFilter: (field, order) => {
        dispatch(setContactGroupSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(ContactGroupsListHead);
