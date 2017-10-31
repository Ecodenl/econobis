import { combineReducers } from 'redux';

import authReducer from './AuthReducer';
import userDetailsReducer from './UserDetailsReducer';
import sidebarReducer from './SidebarReducer';
import contactsReducer from './ContactsReducer';
import contactsFiltersReducer from './ContactsFiltersReducer';
import contactsSortsReducer from './ContactsSortsReducer';
import contactDetailsReducer from './contactDetailsReducer';
import systemDataReducer from './SystemDataReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    userDetails: userDetailsReducer,
    toggleSidebar: sidebarReducer,
    contacts: contactsReducer,
    contactsFilters: contactsFiltersReducer,
    contactsSorts: contactsSortsReducer,
    contactDetails: contactDetailsReducer,
    systemData: systemDataReducer,
});

export default rootReducer;