import { combineReducers } from 'redux';

import documentsListReducer from './DocumentsListReducer';
import documentsPaginationReducer from './DocumentsPaginationReducer';

const documentsReducer = combineReducers({
    list: documentsListReducer,
    pagination: documentsPaginationReducer,
});

export default documentsReducer;
