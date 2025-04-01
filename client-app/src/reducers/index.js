import { combineReducers } from 'redux';

import addressDonglesReducer from './address-dongle/AddressDonglesReducer';
import administrationsReducer from './administration/AdministrationsReducer';
import administrationDetailsReducer from './administration/AdministrationDetailsReducer';
import auditTrailReducer from './audit-trail/AuditTrailReducer';
import authReducer from './general/AuthReducer';
import blockUIReducer from './general/BlockUIReducer';
import calendarReducer from './calendar/CalendarReducer';
import campaignsReducer from './campaign/CampaignsReducer';
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
import housingFileSpecificationsReducer from './housing-file-specification/HousingFileSpecificationsReducer';
import mailboxDetailsReducer from './mailbox/MailboxDetailsReducer';
import mailboxesReducer from './mailbox/MailboxesReducer';
import mailgunDomainsReducer from './mailgun-domain/MailgunDomainReducer';
import MailgunDomainDetailsReducer from './mailgun-domain/MailgunDomainDetailsReducer';
import measuresReducer from './measure/MeasuresReducer';
import measureDetailsReducer from './measure/MeasureDetailsReducer';
import meDetailsReducer from './general/MeDetailsReducer';
import opportunitiesReducer from './opportunity/OpportunitiesReducer';
import opportunityDetailsReducer from './opportunity/OpportunityDetailsReducer';
import orderDetailsReducer from './order/OrderDetailsReducer';
import ordersReducer from './order/OrdersReducer';
import orderPreviewCreateReducer from './order/OrderPreviewCreateReducer';
import participantProjectDetailsReducer from './participant-project/ParticipantProjectDetailsReducer';
import participantsProjectReducer from './participant-project/ParticipantsProjectReducer';
import PostalCodeLinkReducer from './postal-code-link/PostalCodeLinkReducer';
import productDetailsReducer from './product/ProductDetailsReducer';
import productsReducer from './product/ProductsReducer';
import projectsReducer from './project/ProjectsReducer';
import projectDetailsReducer from './project/ProjectDetailsReducer';
import projectRevenueDetailsReducer from './project/ProjectRevenueDetailsReducer';
import revenuesKwhDetailsReducer from './project/RevenuesKwhDetailsReducer';
import revenuesKwhReportPreviewReducer from './project/RevenuesKwhReportPreviewReducer';
import revenuesKwhReportEnergySupplierExcelReducer from './project/RevenuesKwhReportEnergySupplierExcelReducer';
import revenuePartsKwhDetailsReducer from './project/RevenuePartsKwhDetailsReducer';
import revenuePartsKwhReportPreviewReducer from './project/RevenuePartsKwhReportPreviewReducer';
import projectRevenueReportPreviewReducer from './project/ProjectRevenueReportPreviewReducer';
import projectParticipantReportPreviewReducer from './project/ProjectParticipantReportPreviewReducer';
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
import webformsReducer from './webform/WebformsReducer';
import webformDetailsReducer from './webform/WebformDetailsReducer';
import loadingReducer from './general/LoadingReducer';
import financialOverviewPreviewReducer from './financial-overview/FinancialOverviewPreviewReducer';

const rootReducer = combineReducers({
    // General
    auth: authReducer,
    error: errorReducer,
    meDetails: meDetailsReducer,
    systemData: systemDataReducer,
    toggleSidebar: sidebarReducer,
    blockUI: blockUIReducer,
    loadingData: loadingReducer,

    //Audit trail
    auditTrail: auditTrailReducer,

    // Address dongles
    addressDongles: addressDonglesReducer,

    //Administrations
    administrations: administrationsReducer,
    administrationDetails: administrationDetailsReducer,

    // Calendar
    calendar: calendarReducer,

    // Campaign
    campaigns: campaignsReducer,
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
    // Financial overview
    financialOverviewPreview: financialOverviewPreviewReducer,
    // Housing file
    housingFiles: housingFilesReducer,
    housingFileDetails: housingFileDetailsReducer,
    // Housing file Specification
    housingFileSpecifications: housingFileSpecificationsReducer,
    // Opportunity
    opportunities: opportunitiesReducer,
    opportunityDetails: opportunityDetailsReducer,
    // Orders
    orders: ordersReducer,
    orderDetails: orderDetailsReducer,
    orderPreviewCreate: orderPreviewCreateReducer,

    // Participant project
    participantsProject: participantsProjectReducer,
    participantProjectDetails: participantProjectDetailsReducer,
    // Postal code links
    postalCodeLinks: PostalCodeLinkReducer,
    // Products
    products: productsReducer,
    productDetails: productDetailsReducer,
    // Project
    projects: projectsReducer,
    projectDetails: projectDetailsReducer,
    projectRevenue: projectRevenueDetailsReducer,
    projectRevenueReportPreview: projectRevenueReportPreviewReducer,
    projectParticipantReportPreview: projectParticipantReportPreviewReducer,
    // RevenuesKwh
    revenuesKwh: revenuesKwhDetailsReducer,
    revenuesKwhReportPreview: revenuesKwhReportPreviewReducer,
    revenuesKwhReportEnergySupplierExcel: revenuesKwhReportEnergySupplierExcelReducer,
    revenuePartsKwh: revenuePartsKwhDetailsReducer,
    revenuePartsKwhReportPreview: revenuePartsKwhReportPreviewReducer,
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
    // Mailgundomain
    mailgunDomains: mailgunDomainsReducer,
    mailgunDomainDetails: MailgunDomainDetailsReducer,
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
    //Webform
    webforms: webformsReducer,
    webformDetails: webformDetailsReducer,
});

export default rootReducer;
