export const fetchDocuments = (pagination) => {
    return {
        type: 'FETCH_DOCUMENTS',
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