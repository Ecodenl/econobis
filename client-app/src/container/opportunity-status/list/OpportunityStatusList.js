import React from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import OpportunityStatusListItem from './OpportunityStatusListItem';

const OpportunityStatusLists = ({ opportunityStatus, hasError, isLoading }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van kans statussen.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (opportunityStatus.length === 0) {
        loadingText = 'Geen kans statussen gevonden!';
    } else {
        loading = false;
    }

    return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title">
                        <DataTableHeadTitle title={'Omschrijving'} width={'50%'} />
                        <DataTableHeadTitle title={'Actief'} width={'20%'} />
                        {/*todo WM: opschonen velden emailTemplateIdWf, mailCcToCoachWf en numberOfDaysToSendEmail*/}
                        {/*<DataTableHeadTitle title={'Aantal dagen email'} width={'20%'} />*/}
                        <DataTableHeadTitle title={''} width={'10%'} />
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {loading ? (
                        <tr>
                            <td colSpan={4}>{loadingText}</td>
                        </tr>
                    ) : (
                        opportunityStatus.map(opportunityStatus => {
                            return <OpportunityStatusListItem key={opportunityStatus.id} {...opportunityStatus} />;
                        })
                    )}
                </DataTableBody>
            </DataTable>
        </div>
    );
};

export default OpportunityStatusLists;
