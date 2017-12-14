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
import registrationDetailsReducer from './RegistrationDetailsReducer'
import systemDataReducer from './SystemDataReducer';
import usersReducer from './UsersReducer';
import userDetailsReducer from './UserDetailsReducer';
import contactGroupReducer from './ContactGroupReducer';
import contactGroupDetailsReducer from './ContactGroupDetailsReducer';
import contactsInGroupReducer from './ContactsInGroupReducer';
import opportunitiesReducer from './OpportunitiesReducer';

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
    registrationDetails: registrationDetailsReducer,

    systemData: systemDataReducer,
    users: usersReducer,
    userDetails: userDetailsReducer,
    contactGroups: contactGroupReducer,
    contactGroupDetails: contactGroupDetailsReducer,
    contactsInGroup: contactsInGroupReducer,

    opportunities: opportunitiesReducer,
    opportunity: opportunitiesReducer,
});

export default rootReducer;
