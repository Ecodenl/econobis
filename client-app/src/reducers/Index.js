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
import userDetailsReducer from './UserDetailsReducer';
import contactGroupReducer from './ContactGroupReducer';
import contactGroupDetailsReducer from './ContactGroupDetailsReducer';
import contactsInGroupReducer from './ContactsInGroupReducer';

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
    contactGroups: contactGroupReducer,
    contactGroupDetails: contactGroupDetailsReducer,
    contactsInGroup: contactsInGroupReducer,
});

export default rootReducer;
