import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../../components/dataTable/DataTableHeadTitleAndSort';
import { setParticipantsProjectSortsFilter } from '../../../../actions/participants-project/ParticipantsProjectSortsActions';
import DataTableHeadTitle from '../../../../components/dataTable/DataTableHeadTitle';

const ParticipantsListHead = ({
    setParticipantsProjectSortsFilter,
    refreshParticipantsProjectData,
    projectTypeRef,
}) => {
    const setSorts = (field, order) => {
        setParticipantsProjectSortsFilter(field, order);

        setTimeout(() => {
            refreshParticipantsProjectData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitle title={''} width={'2%'} />
            <DataTableHeadTitleAndSort sortColumn={'contactType'} title={'Type'} width={'7%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'name'} title={'Naam'} width={'12%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'address'} title={'Adres'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'postalCode'} title={'Postcode'} width={'6%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'city'} title={'Plaats'} width={'12%'} setSorts={setSorts} />
            {projectTypeRef === 'loan' ? <DataTableHeadTitle title={'Aantal lening'} width={'8%'} /> : null}
            {projectTypeRef === 'obligation' ? <DataTableHeadTitle title={'Aantal obligaties'} width={'8%'} /> : null}
            {projectTypeRef === 'capital' || projectTypeRef === 'postalcode_link_capital' ? (
                <DataTableHeadTitle title={'Aantal deelnames'} width={'8%'} />
            ) : null}
            <DataTableHeadTitleAndSort
                sortColumn={'participantMutationStatusId'}
                title={'Deelname status'}
                width={'9%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'dateRegister'}
                title={'Eerste ingangsdatum deelname'}
                width={'10%'}
                setSorts={setSorts}
            />
            {projectTypeRef === 'postalcode_link_capital' ? (
                <DataTableHeadTitleAndSort
                    sortColumn={'energySupplier'}
                    title={'Energie leverancier'}
                    width={'10%'}
                    setSorts={setSorts}
                />
            ) : null}
            <th width="5%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setParticipantsProjectSortsFilter: (field, order) => {
        dispatch(setParticipantsProjectSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(ParticipantsListHead);
