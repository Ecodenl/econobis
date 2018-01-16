import {combineReducers} from 'redux';

import authReducer from './general/AuthReducer';
import campaignsReducer from './campaign/CampaignsReducer';
import CampaignDetailsReducer from './campaign/CampaignDetailsReducer';
import contactDetailsReducer from './contact/ContactDetailsReducer';
import contactGroupDetailsReducer from './contact-group/ContactGroupDetailsReducer';
import contactGroupReducer from './contact-group/ContactGroupReducer';
import contactsInGroupReducer from './contact-group/ContactsInGroupReducer';
import contactsReducer from './contact/ContactsReducer';
import measuresReducer from './measure/MeasureReducer';
import meDetailsReducer from './general/MeDetailsReducer';
import opportunitiesReducer from './opportunity/OpportunitiesReducer';
import opportunityDetailsReducer from './opportunity/OpportunityDetailsReducer';
import registrationDetailsReducer from './registration/RegistrationDetailsReducer'
import registrationsReducer from './registration/RegistrationsReducer';
import sidebarReducer from './general/SidebarReducer';
import systemDataReducer from './general/SystemDataReducer';
import tasksReducer from './task/TasksReducer';
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
    campaignDetails: CampaignDetailsReducer,
    // Contact
    contacts: contactsReducer,
    contactDetails: contactDetailsReducer,
    // Contact group
    contactGroups: contactGroupReducer,
    contactGroupDetails: contactGroupDetailsReducer,
    contactsInGroup: contactsInGroupReducer,
    // Opportunity
    opportunities: opportunitiesReducer,
    opportunityDetails: opportunityDetailsReducer,
    // Registration
    registrations: registrationsReducer,
    registrationDetails: registrationDetailsReducer,
    // Measures
    measures: measuresReducer,
    measure: measuresReducer,
    //Task
    taskDetails: taskDetailsReducer,
    tasks: tasksReducer,
    // User
    users: usersReducer,
    userDetails: userDetailsReducer,
});

export default rootReducer;
