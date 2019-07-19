import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setParticipantsProjectSortsFilter } from '../../../actions/participants-project/ParticipantsProjectSortsActions';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

const ParticipantsListHead = props => {
    const setSorts = (field, order) => {
        props.setParticipantsProjectSortsFilter(field, order);

        setTimeout(() => {
            props.refreshParticipantsProjectData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitle title={''} width={'2%'} />
            <DataTableHeadTitleAndSort sortColumn={'contactType'} title={'Type'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'name'} title={'Naam'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'address'} title={'Adres'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'postalCode'} title={'Postcode'} width={'8%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'city'} title={'Plaats'} width={'9%'} setSorts={setSorts} />
            <DataTableHeadTitle title={'Project'} width={'8%'} />
            <DataTableHeadTitle title={'Huidig aantal deelnames'} width={'9%'} />
            <DataTableHeadTitleAndSort
                sortColumn={'participantMutationStatusId'}
                title={'Deelname status'}
                width={'8%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'dateRegister'}
                title={'Eerste ingangsdatum'}
                width={'9%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'energySupplier'}
                title={'Energie leverancier'}
                width={'9%'}
                setSorts={setSorts}
            />
            <th width="5%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setParticipantsProjectSortsFilter: (field, order) => {
        dispatch(setParticipantsProjectSortsFilter(field, order));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ParticipantsListHead);
