import { combineReducers } from 'redux';

import ContactGroupsListReducer from './ContactGroupsListReducer';
import ContactGroupsFiltersReducer from './ContactGroupsFiltersReducer';
import ContactGroupsSortsReducer from './ContactGroupsSortsReducer';
import ContactGroupsPaginationReducer from './ContactGroupsPaginationReducer';

const ContactGroupsReducer = combineReducers({
    list: ContactGroupsListReducer,
    filters: ContactGroupsFiltersReducer,
    sorts: ContactGroupsSortsReducer,
    pagination: ContactGroupsPaginationReducer,
});

export default ContactGroupsReducer;
