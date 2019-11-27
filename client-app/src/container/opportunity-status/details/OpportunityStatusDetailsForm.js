import React from 'react';
import { isEmpty } from 'lodash';

import OpportunityStatusDetailsFormGeneral from './general/OpportunityStatusDetailsFormGeneral';

const OpportunityStatusDetailsForm = ({ opportunityStatus, hasError, isLoading, updateState }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van kans status.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (isEmpty(opportunityStatus)) {
        loadingText = 'Geen kans status gevonden!';
    } else {
        loading = false;
    }

    return loading ? (
        <div>{loadingText}</div>
    ) : (
        <div>
            <OpportunityStatusDetailsFormGeneral opportunityStatus={opportunityStatus} updateState={updateState} />
        </div>
    );
};

export default OpportunityStatusDetailsForm;
