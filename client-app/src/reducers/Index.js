import {combineReducers} from 'redux';

import authReducer from './general/AuthReducer';
import campaignsReducer from './campaign/CampaignsReducer';
import contactDetailsReducer from './contact/ContactDetailsReducer';
import contactGroupDetailsReducer from './contact-group/ContactGroupDetailsReducer';
import contactGroupReducer from './contact-group/ContactGroupReducer';
import contactsInGroupReducer from './contact-group/ContactsInGroupReducer';
import contactsListReducer from './contact/ContactsListReducer';
import measuresReducer from './measure/MeasureReducer';
import meDetailsReducer from './general/MeDetailsReducer';
import opportunitiesReducer from './opportunity/OpportunitiesReducer';
import registrationDetailsReducer from './registration/RegistrationDetailsReducer'
import registrationsListReducer from './registration/RegistrationsListReducer';
import sidebarReducer from './general/SidebarReducer';
import systemDataReducer from './general/SystemDataReducer';
import tasksListReducer from './task/TasksListReducer';
import taskDetailsReducer from './task/TaskDetailsReducer';
import userDetailsReducer from './user/UserDetailsReducer';
import usersReducer from './user/UsersReducer';

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
    contacts: contactsListReducer,
    contactDetails: contactDetailsReducer,
    // Contact group
    contactGroups: contactGroupReducer,
    contactGroupDetails: contactGroupDetailsReducer,
    contactsInGroup: contactsInGroupReducer,
    // Opportunity
    opportunities: opportunitiesReducer,
    opportunity: opportunitiesReducer,

    // Registration
    registrations: registrationsListReducer,
    registrationDetails: registrationDetailsReducer,

    // Measures
    measures: measuresReducer,
    measure: measuresReducer,

    //Task
    taskDetails: taskDetailsReducer,
    tasks: tasksListReducer,
    // User
    users: usersReducer,
    userDetails: userDetailsReducer,
});

export default rootReducer;
