import { combineReducers } from 'redux';

import authReducer from './AuthReducer';
import meDetailsReducer from './MeDetailsReducer';
import sidebarReducer from './SidebarReducer';
import contactsReducer from './ContactsReducer';
import contactsFiltersReducer from './ContactsFiltersReducer';
import contactsSortsReducer from './ContactsSortsReducer';
import contactDetailsReducer from './contactDetailsReducer';
import registrationsReducer from './RegistrationsReducer';
import registrationsFiltersReducer from './RegistrationsFiltersReducer';
import registrationsSortsReducer from './RegistrationsSortsReducer';
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

    registrations: registrationsReducer,
    registrationsFilters: registrationsFiltersReducer,
    registrationsSorts: registrationsSortsReducer,

    systemData: systemDataReducer,
    users: usersReducer,
    userDetails: userDetailsReducer,
});

export default rootReducer;