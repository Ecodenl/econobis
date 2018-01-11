import {combineReducers} from 'redux';

import authReducer from './general/AuthReducer';
import campaignsReducer from './campaign/CampaignsReducer';
import contactDetailsReducer from './contact/ContactDetailsReducer';
import contactGroupDetailsReducer from './contact-group/ContactGroupDetailsReducer';
import contactGroupReducer from './contact-group/ContactGroupReducer';
import contactsFiltersReducer from './contact/ContactsFiltersReducer';
import contactsPaginationReducer from './contact/ContactsPaginationReducer';
import contactsInGroupReducer from './contact-group/ContactsInGroupReducer';
import contactsReducer from './contact/ContactsReducer';
import contactsSortsReducer from './contact/ContactsSortsReducer';
import measuresReducer from './measure/MeasureReducer';
import meDetailsReducer from './general/MeDetailsReducer';
import opportunitiesReducer from './opportunity/OpportunitiesReducer';
import registrationDetailsReducer from './registration/RegistrationDetailsReducer'
import registrationsFiltersReducer from './registration/RegistrationsFiltersReducer';
import registrationsReducer from './registration/RegistrationsReducer';
import registrationsSortsReducer from './registration/RegistrationsSortsReducer';
import registrationsPaginationReducer from './registration/RegistrationsPaginationReducer';
import sidebarReducer from './general/SidebarReducer';
import systemDataReducer from './general/SystemDataReducer';
import taskDetailsReducer from './task/TaskDetailsReducer';
import tasksFiltersReducer from './task/TasksFiltersReducer';
import tasksReducer from './task/TasksReducer';
import tasksSortsReducer from './task/TasksSortsReducer';
import userDetailsReducer from './user/UserDetailsReducer';
import usersReducer from './user/UsersReducer';

const contactCombinedReducer = combineReducers({
    data: contactsReducer,
    filters: contactsFiltersReducer,
    sorts: contactsSortsReducer,
    pagination: contactsPaginationReducer,
});

const registrationsCombinedReducer = combineReducers({
    data: registrationsReducer,
    filters: registrationsFiltersReducer,
    sorts: registrationsSortsReducer,
    pagination: registrationsPaginationReducer,
});

const rootReducer = combineReducers({
    // General
    auth: authReducer,
    meDetails: meDetailsReducer,
    systemData: systemDataReducer,
    toggleSidebar: sidebarReducer,
    // Campaign
    campaigns: campaignsReducer,
    campaign: campaignsReducer,
    // Contact
    contacts: contactCombinedReducer,
    // Contact group
    contactGroups: contactGroupReducer,
    contactGroupDetails: contactGroupDetailsReducer,
    contactsInGroup: contactsInGroupReducer,
    // Opportunity
    opportunities: opportunitiesReducer,
    opportunity: opportunitiesReducer,

    // Registration
    registrations: registrationsCombinedReducer,
    registrationDetails: registrationDetailsReducer,

    // Measures
    measures: measuresReducer,
    measure: measuresReducer,

    //Task
    taskDetails: taskDetailsReducer,
    tasks: tasksReducer,
    tasksFilters: tasksFiltersReducer,
    tasksSorts: tasksSortsReducer,
    // User
    users: usersReducer,
    userDetails: userDetailsReducer,
});

export default rootReducer;
