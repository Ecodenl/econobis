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