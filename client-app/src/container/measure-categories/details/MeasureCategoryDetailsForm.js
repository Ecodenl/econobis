import React from 'react';
import { isEmpty } from 'lodash';

import MeasureCategoryDetailsFormGeneral from './general/MeasureCategoryDetailsFormGeneral';

const MeasureCategoryDetailsForm = ({ measureCategory, hasError, isLoading, updateState }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van maatregel categorie.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (isEmpty(measureCategory)) {
        loadingText = 'Geen maatregel categorie gevonden!';
    } else {
        loading = false;
    }

    return loading ? (
        <div>{loadingText}</div>
    ) : (
        <div>
            <MeasureCategoryDetailsFormGeneral measureCategory={measureCategory} updateState={updateState} />
        </div>
    );
};

export default MeasureCategoryDetailsForm;
