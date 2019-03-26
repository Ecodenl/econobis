import React from 'react';
import { isEmpty } from 'lodash';

import LedgerDetailsFormGeneral from './general/LedgerDetailsFormGeneral';

const LedgerDetailsForm = ({ ledger, hasError, isLoading, updateState }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van BTW code.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (isEmpty(ledger)) {
        loadingText = 'Geen BTW code gevonden!';
    } else {
        loading = false;
    }

    return loading ? (
        <div>{loadingText}</div>
    ) : (
        <div>
            <LedgerDetailsFormGeneral ledger={ledger} updateState={updateState} />
        </div>
    );
};

export default LedgerDetailsForm;
