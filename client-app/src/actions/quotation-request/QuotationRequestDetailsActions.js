export const fetchQuotationRequestDetails = (payload) => {
    return {
        type: 'FETCH_QUOTATION_REQUEST_DETAILS',
        payload
    }
};

export const updateQuotationRequest = (quotationRequest) => {
    return {
        type: 'UPDATE_QUOTATION_REQUEST',
        quotationRequest
    }
};

export const deleteQuotationRequest = (id) => {
    return {
        type: 'DELETE_QUOTATION_REQUEST',
        id
    }
};
