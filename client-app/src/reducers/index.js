import {combineReducers} from 'redux';

import administrationsReducer from './administration/AdministrationsReducer';
import administrationDetailsReducer from './administration/AdministrationDetailsReducer';
import auditTrailReducer from './audit-trail/AuditTrailReducer';
import authReducer from './general/AuthReducer';
import blockUIReducer from './general/BlockUIReducer';
import calendarReducer from './calendar/CalendarReducer';
import campaignsReducer from './campaign/CampaignsReducer';
import campaignDetailsReducer from './campaign/CampaignDetailsReducer';
import contactDetailsReducer from './contact/ContactDetailsReducer';
import contactGroupDetailsReducer from './contact-group/ContactGroupDetailsReducer';
import contactGroupsReducer from './contact-group/ContactGroupsReducer';
import contactsInGroupReducer from './contact-group/ContactsInGroupReducer';
import contactsReducer from './contact/ContactsReducer';
import documentTemplateReducer from './document-template/DocumentTemplatesReducer';
import documentTemplateDetailsReducer from './document-template/DocumentTemplateDetailsReducer';
import documentsReducer from './document/DocumentsReducer';
import documentDetailsReducer from './document/DocumentDetailsReducer';
import bulkMailToReducer from './email/BulkMailToReducer';
import emailsReducer from './email/EmailsReducer';
import emailDetailsReducer from './email/EmailDetailsReducer';
import emailTemplatesReducer from './email-template/EmailTemplatesReducer';
import emailTemplateDetailsReducer from './email-template/EmailTemplateDetailsReducer';
import errorReducer from './general/ErrorReducer';
import housingFileDetailsReducer from './housing-file/HousingFileDetailsReducer';
import housingFilesReducer from './housing-file/HousingFilesReducer';
import mailboxDetailsReducer from './mailbox/MailboxDetailsReducer';
import mailboxesReducer from './mailbox/MailboxesReducer';
import measuresReducer from './measure/MeasuresReducer';
import measureDetailsReducer from './measure/MeasureDetailsReducer';
import meDetailsReducer from './general/MeDetailsReducer';
import opportunitiesReducer from './opportunity/OpportunitiesReducer';
import opportunityDetailsReducer from './opportunity/OpportunityDetailsReducer';
import orderDetailsReducer from './order/OrderDetailsReducer';
import ordersReducer from './order/OrdersReducer';
import participantProductionProjectDetailsReducer from './participant-production-project/ParticipantProductionProjectDetailsReducer';
import participantsProductionProjectReducer from './participant-production-project/ParticipantsProductionProjectReducer';
import PostalCodeLinkReducer from './postal-code-link/PostalCodeLinkReducer';
import productDetailsReducer from './product/ProductDetailsReducer';
import productsReducer from './product/ProductsReducer';
import productionProjectsReducer from './production-project/ProductionProjectsReducer';
import productionProjectDetailsReducer from './production-project/ProductionProjectDetailsReducer';
import productionProjectRevenueDetailsReducer from './production-project/ProductionProjectRevenueDetailsReducer';
import productionProjectRevenueReportPreviewReducer from './production-project/ProductionProjectRevenueReportPreviewReducer';
import productionProjectParticipantReportPreviewReducer from './production-project/ProductionProjectParticipantReportPreviewReducer';
import intakeDetailsReducer from './intake/IntakeDetailsReducer';
import intakesReducer from './intake/IntakesReducer';
import invoiceDetailsReducer from './invoice/InvoiceDetailsReducer';
import invoicesReducer from './invoice/InvoicesReducer';
import invoicePreviewSendReducer from './invoice/InvoicePreviewSendReducer';
import quotationRequestsReducer from './quotation-request/QuotationRequestsReducer';
import quotationRequestDetailsReducer from './quotation-request/QuotationRequestDetailsReducer';
import sidebarReducer from './general/SidebarReducer';
import systemDataReducer from './general/SystemDataReducer';
import tasksReducer from './task/TasksReducer';
import notesReducer from './task/NotesReducer';
import taskDetailsReducer from './task/TaskDetailsReducer';
import teamsReducer from './team/TeamsReducer';
import teamDetailsReducer from './team/TeamDetailsReducer';
import userDetailsReducer from './user/UserDetailsReducer';
import usersReducer from './user/UsersReducer';
import PaymentInvoicesReducer from './payment-invoice/PaymentInvoicesReducer';

const rootReducer = combineReducers({
    // General
    auth: authReducer,
    error: errorReducer,
    meDetails: meDetailsReducer,
    systemData: systemDataReducer,
    toggleSidebar: sidebarReducer,
    blockUI: blockUIReducer,

    //Audit trail
    auditTrail: auditTrailReducer,

    //Administrations
    administrations: administrationsReducer,
    administrationDetails: administrationDetailsReducer,

    // Calendar
    calendar: calendarReducer,

    // Campaign
    campaigns: campaignsReducer,
    campaignDetails: campaignDetailsReducer,
    // Contact
    contacts: contactsReducer,
    contactDetails: contactDetailsReducer,
    // Contact group
    contactGroups: contactGroupsReducer,
    contactGroupDetails: contactGroupDetailsReducer,
    contactsInGroup: contactsInGroupReducer,
    // Documents
    documents: documentsReducer,
    documentDetails: documentDetailsReducer,
    // Document templates
    documentTemplates: documentTemplateReducer,
    documentTemplateDetails: documentTemplateDetailsReducer,
    // Emails
    bulkMailTo: bulkMailToReducer,
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
    // Orders
    orders: ordersReducer,
    orderDetails: orderDetailsReducer,
    // Participant production project
    participantsProductionProject: participantsProductionProjectReducer,
    participantProductionProjectDetails: participantProductionProjectDetailsReducer,
    // Postal code links
    postalCodeLinks : PostalCodeLinkReducer,
    // Products
    products: productsReducer,
    productDetails: productDetailsReducer,
    // Production project
    productionProjects: productionProjectsReducer,
    productionProjectDetails: productionProjectDetailsReducer,
    productionProjectRevenue: productionProjectRevenueDetailsReducer,
    productionProjectRevenueReportPreview: productionProjectRevenueReportPreviewReducer,
    productionProjectParticipantReportPreview: productionProjectParticipantReportPreviewReducer,
    // Intake
    intakes: intakesReducer,
    intakeDetails: intakeDetailsReducer,
    // invoices
    invoices: invoicesReducer,
    invoiceDetails: invoiceDetailsReducer,
    invoicePreviewSend: invoicePreviewSendReducer,
    // Mailbox
    mailboxes: mailboxesReducer,
    mailboxDetails: mailboxDetailsReducer,
    // Measures
    measures: measuresReducer,
    measureDetails: measureDetailsReducer,
    //Quotation request
    quotationRequests: quotationRequestsReducer,
    quotationRequestDetails: quotationRequestDetailsReducer,
    //Task / note
    taskDetails: taskDetailsReducer,
    tasks: tasksReducer,
    notes: notesReducer,
    //Team
    teams: teamsReducer,
    teamDetails: teamDetailsReducer,
    // User
    users: usersReducer,
    userDetails: userDetailsReducer,

    // Payment invoices
    paymentInvoices: PaymentInvoicesReducer,
});

export default rootReducer;
