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
import tasksReducer from './task/TasksReducer';
import tasksFiltersReducer from './task/TasksFiltersReducer';
import tasksSortsReducer from './task/TasksSortsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    meDetails: meDetailsReducer,
    toggleSidebar: sidebarReducer,
    // Contacts
    contacts: contactsReducer,
    contactsFilters: contactsFiltersReducer,
    contactsSorts: contactsSortsReducer,
    contactDetails: contactDetailsReducer,
    // Registrations
    registrations: registrationsReducer,
    registrationsFilters: registrationsFiltersReducer,
    registrationsSorts: registrationsSortsReducer,
    registrationDetails: registrationDetailsReducer,
    //Systemdata
    systemData: systemDataReducer,
    users: usersReducer,
    userDetails: userDetailsReducer,
    contactGroups: contactGroupReducer,
    contactGroupDetails: contactGroupDetailsReducer,
    contactsInGroup: contactsInGroupReducer,
    //Tasks
    tasks: tasksReducer,
    tasksFilters: tasksFiltersReducer,
    tasksSorts: tasksSortsReducer,
});

export default rootReducer;
