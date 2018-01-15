import { combineReducers } from 'redux';

import contactsReducer from "./ContactsReducer";
import contactsPaginationReducer from "./ContactsPaginationReducer";
import contactsFiltersReducer from "./ContactsFiltersReducer";
import contactsSortsReducer from "./ContactsSortsReducer";

const contactsListReducer = combineReducers({
    list: contactsReducer,
    filters: contactsFiltersReducer,
    sorts: contactsSortsReducer,
    pagination: contactsPaginationReducer,
});

export default contactsListReducer;
