import { combineReducers } from 'redux';

import authReducer from './AuthReducer';
import meDetailsReducer from './MeDetailsReducer';
import sidebarReducer from './SidebarReducer';
import contactsReducer from './ContactsReducer';
import contactsFiltersReducer from './ContactsFiltersReducer';
import contactsSortsReducer from './ContactsSortsReducer';
import contactDetailsReducer from './contactDetailsReducer';
import systemDataReducer from './SystemDataReducer';
import usersReducer from './UsersReducer';
import userDetailsReducer from './userDetailsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    meDetails: meDetailsReducer,
    toggleSidebar: sidebarReducer,
    contacts: contactsReducer,
    contactsFilters: contactsFiltersReducer,
    contactsSorts: contactsSortsReducer,
    contactDetails: contactDetailsReducer,
    systemData: systemDataReducer,
    users: usersReducer,
    userDetails: userDetailsReducer,
});

export default rootReducer;