import {combineReducers} from 'redux';

import authReducer from './general/AuthReducer';
import campaignsReducer from './campaign/CampaignsReducer';
import contactDetailsReducer from './contact/ContactDetailsReducer';
import contactGroupDetailsReducer from './contact-group/ContactGroupDetailsReducer';
import contactGroupReducer from './contact-group/ContactGroupReducer';
import contactsFiltersReducer from './contact/ContactsFiltersReducer';
import contactsInGroupReducer from './contact-group/ContactsInGroupReducer';
import contactsReducer from './contact/ContactsReducer';
import contactsSortsReducer from './contact/ContactsSortsReducer';
import emailsReducer from './email/EmailsReducer';
import emailDetailsReducer from './email/emailDetailsReducer';
import emailTemplatesReducer from './email-template/emailTemplatesReducer';
import emailTemplateDetailsReducer from './email-template/emailTemplateDetailsReducer';
import mailboxDetailsReducer from './mailbox/mailboxDetailsReducer';
import mailboxesReducer from './mailbox/mailboxesReducer';
import measuresReducer from './measure/MeasureReducer';
import meDetailsReducer from './general/MeDetailsReducer';
import opportunitiesReducer from './opportunity/OpportunitiesReducer';
import registrationDetailsReducer from './registration/RegistrationDetailsReducer'
import registrationsFiltersReducer from './registration/RegistrationsFiltersReducer';
import registrationsReducer from './registration/RegistrationsReducer';
import registrationsSortsReducer from './registration/RegistrationsSortsReducer';
import sidebarReducer from './general/SidebarReducer';
import systemDataReducer from './general/SystemDataReducer';
import taskDetailsReducer from './task/TaskDetailsReducer';
import tasksFiltersReducer from './task/TasksFiltersReducer';
import tasksReducer from './task/TasksReducer';
import tasksSortsReducer from './task/TasksSortsReducer';
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
    contacts: contactsReducer,
    contactsFilters: contactsFiltersReducer,
    contactsSorts: contactsSortsReducer,
    contactDetails: contactDetailsReducer,
    // Contact group
    contactGroups: contactGroupReducer,
    contactGroupDetails: contactGroupDetailsReducer,
    contactsInGroup: contactsInGroupReducer,

    // Emails
    emails: emailsReducer,
    email: emailDetailsReducer,

    // Email templates
    emailTemplates: emailTemplatesReducer,
    emailTemplate: emailTemplateDetailsReducer,

    // Opportunity
    opportunities: opportunitiesReducer,
    opportunity: opportunitiesReducer,

    // Registration
    registrations: registrationsReducer,
    registrationsFilters: registrationsFiltersReducer,
    registrationsSorts: registrationsSortsReducer,
    registrationDetails: registrationDetailsReducer,

    // Mailbox
    mailboxes: mailboxesReducer,
    mailboxDetails: mailboxDetailsReducer,

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
