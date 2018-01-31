import { combineReducers } from 'redux';

import emailsListReducer from './EmailsListReducer';
import emailsPaginationReducer from './EmailsPaginationReducer';
import emailsFiltersReducer from './EmailFiltersReducer';
import emailsSortsReducer from './EmailSortsReducer';

const emailsReducer = combineReducers({
    list: emailsListReducer,
    filters: emailsFiltersReducer,
    sorts: emailsSortsReducer,
    pagination: emailsPaginationReducer,
});

export default emailsReducer;
