import { combineReducers } from 'redux';

import contactsListReducer from "./ContactsListReducer";
import contactsPaginationReducer from "./ContactsPaginationReducer";
import contactsFiltersReducer from "./ContactsFiltersReducer";
import contactsSortsReducer from "./ContactsSortsReducer";

const contactsReducer = combineReducers({
    list: contactsListReducer,
    filters: contactsFiltersReducer,
    sorts: contactsSortsReducer,
    pagination: contactsPaginationReducer,
});

export default contactsReducer;
