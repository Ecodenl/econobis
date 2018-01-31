const filtersReducerDefaultState = {
    number: {
        field: 'number',
        data: '',
    },
    date: {
        field: 'date',
        data: '',
    },
    filename: {
        field: 'filename',
        data: '',
    },
    contact: {
        field: 'contact',
        data: '',
    },
    documentType: {
        field: 'documentType',
        data: '',
    },
    documentGroup: {
        field: 'documentGroup',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_FILTER_DOCUMENT_NUMBER':
            return {
                ...state,
                number: {
                    ...state.number,
                    data: action.number,
                }
            };
        case 'SET_FILTER_DOCUMENT_DATE':
            return {
                ...state,
                date: {
                    ...state.date,
                    data: action.date,
                }
            };
        case 'SET_FILTER_DOCUMENT_FILENAME':
            return {
                ...state,
                filename: {
                    ...state.filename,
                    data: action.filename,
                }
            };
        case 'SET_FILTER_DOCUMENT_CONTACT':
            return {
                ...state,
                contact: {
                    ...state.contact,
                    data: action.contact,
                }
            };
        case 'SET_FILTER_DOCUMENT_DOCUMENT_TYPE':
            return {
                ...state,
                documentType: {
                    ...state.documentType,
                    data: action.documentType,
                }
            };
        case 'SET_FILTER_DOCUMENT_DOCUMENT_GROUP':
            return {
                ...state,
                documentGroup: {
                    ...state.documentGroup,
                    data: action.documentGroup,
                }
            };
        case 'CLEAR_FILTER_DOCUMENT':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
