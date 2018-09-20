import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../../../components/dataTable/DataTableHeadTitleAndSort';
import { setParticipantsProductionProjectSortsFilter } from '../../../../../actions/participants-production-project/ParticipantsProductionProjectSortsActions';
import DataTableHeadTitle from "../../../../../components/dataTable/DataTableHeadTitle";

const ParticipantsListHead = (props) => {
    const setSorts = (field, order) => {
        props.setParticipantsProductionProjectSortsFilter(field, order);

        setTimeout(() => {
            props.refreshParticipantsProductionProjectData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort sortColumn={'id'} title={'Id'} width={'5%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'contactType'} title={'Type'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'name'} title={'Naam'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'address'} title={'Adres'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'postalCode'} title={'Postcode'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'city'} title={'Plaats'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitle title={'Huidig aantal participaties'} width={'10%'} />
            <DataTableHeadTitleAndSort sortColumn={'participationStatusId'} title={'Participatie status'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'dateRegister'} title={'Datum inschrijving participatie'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'energySupplier'} title={'Energie leverancier'} width={'10%'} setSorts={setSorts} />
            <th width="5%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setParticipantsProductionProjectSortsFilter: (field, order) => {
        dispatch(setParticipantsProductionProjectSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(ParticipantsListHead);
