import React from 'react';
import { isEmpty } from 'lodash';

import QuotationRequestStatusDetailsFormGeneral from './general/QuotationRequestStatusDetailsFormGeneral';

const QuotationRequestStatusDetailsForm = ({ quotationRequestStatus, hasError, isLoading, updateState }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van offerte verzoek status.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (isEmpty(quotationRequestStatus)) {
        loadingText = 'Geen offerte verzoek status gevonden!';
    } else {
        loading = false;
    }

    return loading ? (
        <div>{loadingText}</div>
    ) : (
        <div>
            <QuotationRequestStatusDetailsFormGeneral
                quotationRequestStatus={quotationRequestStatus}
                updateState={updateState}
            />
        </div>
    );
};

export default QuotationRequestStatusDetailsForm;
