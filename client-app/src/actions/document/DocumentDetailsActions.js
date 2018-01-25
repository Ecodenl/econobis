export const fetchDocumentDetails = (id) => {
    return {
        type: 'FETCH_DOCUMENT_DETAILS',
        id,
    };
};

export const updateDocument = (document) => {
    return {
        type: 'UPDATE_DOCUMENT_DETAILS',
        document,
    };
};

export const deleteDocument = (id) => {
    return  {
        type: 'DELETE_DOCUMENT',
        id,
    };
};
