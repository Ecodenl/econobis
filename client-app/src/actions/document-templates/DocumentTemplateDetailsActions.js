export const fetchDocumentTemplate = (id) => {
    return {
        type: 'FETCH_DOCUMENT_TEMPLATE',
        id,
    };
};

export const deleteDocumentTemplate = (id) => {
    return {
        type: 'DELETE_DOCUMENT_TEMPLATE',
        id,
    };
};

export const clearDocumentTemplate = () => {
    return {
        type: 'CLEAR_DOCUMENT_TEMPLATE'
    };
};