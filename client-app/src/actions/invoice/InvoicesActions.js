export const fetchInvoices = (filters, sorts, pagination, administrationId) => {
    return {
        type: 'FETCH_INVOICES',
        filters,
        sorts,
        pagination,
        administrationId,
    };
};

export const setCheckedInvoiceAll = (checkedValue) => {
    return  {
        type: 'SET_CHECKED_INVOICE_ALL',
        checkedValue,
    };
};

export const setCheckedInvoice = (id) => {
    return  {
        type: 'SET_CHECKED_INVOICE',
        id,
    };
};

export const previewSend = (data) => {
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
        type: 'CLEAR_INVOICES'
    };
};

