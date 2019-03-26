import React from 'react';
import { isEmpty } from 'lodash';

import VatCodeDetailsFormGeneral from './general/VatCodeDetailsFormGeneral';

const VatCodeDetailsForm = ({ vatCode, hasError, isLoading, updateState }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van BTW code.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (isEmpty(vatCode)) {
        loadingText = 'Geen BTW code gevonden!';
    } else {
        loading = false;
    }

    return loading ? (
        <div>{loadingText}</div>
    ) : (
        <div>
            <VatCodeDetailsFormGeneral vatCode={vatCode} updateState={updateState} />
        </div>
    );
};

export default VatCodeDetailsForm;
