export const setFilterDocumentNumber = number => ({
    type: 'SET_FILTER_DOCUMENT_NUMBER',
    number,
});

export const setFilterDocumentDate = date => ({
    type: 'SET_FILTER_DOCUMENT_DATE',
    date,
});

export const setFilterDocumentFilename = filename => ({
    type: 'SET_FILTER_DOCUMENT_FILENAME',
    filename,
});

export const setFilterDocumentContact = contact => ({
    type: 'SET_FILTER_DOCUMENT_CONTACT',
    contact,
});

export const setFilterDocumentDocumentType = documentType => ({
    type: 'SET_FILTER_DOCUMENT_DOCUMENT_TYPE',
    documentType,
});

export const setFilterDocumentDocumentGroup = documentGroup => ({
    type: 'SET_FILTER_DOCUMENT_DOCUMENT_GROUP',
    documentGroup,
});

export const clearFilterDocuments = () => ({
    type: 'CLEAR_FILTER_DOCUMENT',
});
