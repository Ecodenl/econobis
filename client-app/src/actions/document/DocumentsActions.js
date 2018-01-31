export const fetchDocuments = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_DOCUMENTS',
        filters,
        sorts,
        pagination,
    };
};

export const clearDocuments = () => {
    return {
        type: 'CLEAR_DOCUMENTS'
    };
};

export const deleteDocument = (id) => {
    return  {
        type: 'DELETE_DOCUMENT',
        id,
    };
};