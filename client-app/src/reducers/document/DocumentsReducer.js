import { combineReducers } from 'redux';

import documentsListReducer from './DocumentsListReducer';
import documentsPaginationReducer from './DocumentsPaginationReducer';
import documentsFiltersReducer from './DocumentFiltersReducer';
import documentsSortsReducer from './DocumentSortsReducer';

const documentsReducer = combineReducers({
    list: documentsListReducer,
    filters: documentsFiltersReducer,
    sorts: documentsSortsReducer,
    pagination: documentsPaginationReducer,
});

export default documentsReducer;
