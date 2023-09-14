import React from 'react';
import { isEmpty } from 'lodash';

import FreeFieldDetailsFormGeneral from './general/FreeFieldDetailsFormGeneral';

const FreeFieldDetailsForm = ({ freeField, hasError, isLoading, fetchFreeField }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van het vrije veld.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (isEmpty(freeField)) {
        loadingText = 'Geen vrij veld gevonden!';
    } else {
        loading = false;
    }

    return loading ? (
        <div>{loadingText}</div>
    ) : (
        <div>
            <FreeFieldDetailsFormGeneral freeField={freeField} fetchFreeField={fetchFreeField} />
        </div>
    );
};

export default FreeFieldDetailsForm;
