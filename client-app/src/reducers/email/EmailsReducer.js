import { combineReducers } from 'redux';

import emailsListReducer from './EmailsListReducer';
import emailsPaginationReducer from './EmailsPaginationReducer';

const emailsReducer = combineReducers({
    list: emailsListReducer,
    pagination: emailsPaginationReducer,
});

export default emailsReducer;
