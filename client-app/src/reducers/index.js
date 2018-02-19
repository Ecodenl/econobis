import {combineReducers} from 'redux';

import auditTrailReducer from './audit-trail/AuditTrailReducer';
import authReducer from './general/AuthReducer';
import calendarReducer from './calendar/CalendarReducer';
import campaignsReducer from './campaign/CampaignsReducer';
import campaignDetailsReducer from './campaign/CampaignDetailsReducer';
import contactDetailsReducer from './contact/ContactDetailsReducer';
import contactGroupDetailsReducer from './contact-group/ContactGroupDetailsReducer';
import contactGroupReducer from './contact-group/ContactGroupReducer';
import contactsInGroupReducer from './contact-group/ContactsInGroupReducer';
import contactsReducer from './contact/ContactsReducer';
import documentTemplateReducer from './document-template/DocumentTemplatesReducer';
import documentTemplateDetailsReducer from './document-template/DocumentTemplateDetailsReducer';
import documentsReducer from './document/DocumentsReducer';
import documentDetailsReducer from './document/DocumentDetailsReducer';
import emailsReducer from './email/EmailsReducer';
import emailDetailsReducer from './email/EmailDetailsReducer';
import emailTemplatesReducer from './email-template/EmailTemplatesReducer';
import emailTemplateDetailsReducer from './email-template/EmailTemplateDetailsReducer';
import errorReducer from './general/ErrorReducer';
import housingFileDetailsReducer from './housing-file/HousingFileDetailsReducer';
import housingFilesReducer from './housing-file/HousingFilesReducer';
import mailboxDetailsReducer from './mailbox/MailboxDetailsReducer';
import mailboxesReducer from './mailbox/MailboxesReducer';
import measuresReducer from './measure/MeasureReducer';
import meDetailsReducer from './general/MeDetailsReducer';
import opportunitiesReducer from './opportunity/OpportunitiesReducer';
import opportunityDetailsReducer from './opportunity/OpportunityDetailsReducer';
import intakeDetailsReducer from './intake/IntakeDetailsReducer';
import intakesReducer from './intake/IntakesReducer';
import sidebarReducer from './general/SidebarReducer';
import systemDataReducer from './general/SystemDataReducer';
import tasksReducer from './task/TasksReducer';
import taskDetailsReducer from './task/TaskDetailsReducer';
import teamsReducer from './team/TeamsReducer';
import teamDetailsReducer from './team/TeamDetailsReducer';
import userDetailsReducer from './user/UserDetailsReducer';
import usersReducer from './user/UsersReducer';

const rootReducer = combineReducers({
    // General
    auth: authReducer,
    error: errorReducer,
    meDetails: meDetailsReducer,
    systemData: systemDataReducer,
    toggleSidebar: sidebarReducer,

    //Audit trail
    auditTrail: auditTrailReducer,

    // Calendar
    calendar: calendarReducer,

    // Campaign
    campaigns: campaignsReducer,
    campaignDetails: campaignDetailsReducer,
    // Contact
    contacts: contactsReducer,
    contactDetails: contactDetailsReducer,
    // Contact group
    contactGroups: contactGroupReducer,
    contactGroupDetails: contactGroupDetailsReducer,
    contactsInGroup: contactsInGroupReducer,
    // Documents
    documents: documentsReducer,
    documentDetails: documentDetailsReducer,
    // Document templates
    documentTemplates: documentTemplateReducer,
    documentTemplateDetails: documentTemplateDetailsReducer,
    // Emails
    emails: emailsReducer,
    email: emailDetailsReducer,
    // Email templates
    emailTemplates: emailTemplatesReducer,
    emailTemplate: emailTemplateDetailsReducer,
    // Housing file
    housingFiles: housingFilesReducer,
    housingFileDetails: housingFileDetailsReducer,
    // Opportunity
    opportunities: opportunitiesReducer,
    opportunityDetails: opportunityDetailsReducer,
    // Intake
    intakes: intakesReducer,
    intakeDetails: intakeDetailsReducer,
    // Mailbox
    mailboxes: mailboxesReducer,
    mailboxDetails: mailboxDetailsReducer,
    // Measures
    measures: measuresReducer,
    measure: measuresReducer,
    //Task
    taskDetails: taskDetailsReducer,
    tasks: tasksReducer,
    //Team
    teams: teamsReducer,
    teamDetails: teamDetailsReducer,
    // User
    users: usersReducer,
    userDetails: userDetailsReducer,
});

export default rootReducer;
