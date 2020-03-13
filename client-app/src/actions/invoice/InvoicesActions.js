export const fetchInvoices = (filters, sorts, pagination, administrationId, onlyEmailInvoices, onlyPostInvoices) => {
    return {
        type: 'FETCH_INVOICES',
        filters,
        sorts,
        pagination,
        administrationId,
        onlyEmailInvoices,
        onlyPostInvoices,
    };
};

export const previewSend = data => {
    return {
        type: 'INVOICE_PREVIEW_SEND',
        data,
    };
};

export const clearPreviewSend = () => {
    return {
        type: 'CLEAR_INVOICE_PREVIEW_SEND',
    };
};

export const clearInvoices = () => {
    return {
        type: 'CLEAR_INVOICES',
    };
};

export const deleteInvoiceFromGrid = id => {
    return {
        type: 'DELETE_INVOICE_FROM_GRID',
        id,
    };
};
