import { takeLatest, takeEvery } from 'redux-saga/effects';

import { fetchAuditTrailSaga } from './audit-trail/AuditTrailSaga';
import {
    addAdministrationUserSaga,
    deleteAdministrationSepaSaga,
    deleteAdministrationUserSaga,
    fetchAdministrationDetailsSaga,
    updateAdministrationDetailsSaga,
} from './administration/AdministrationDetailsSaga';
import { deleteAdministrationSaga, fetchAdministrationsSaga } from './administration/AdministrationsSaga';
import { fetchCampaignsSaga } from './campaign/CampaignsSaga';
import { fetchCampaignSaga, deleteCampaignSaga } from './campaign/CampaignDetailsSaga';
import {
    fetchContactDetailsSaga,
    deleteAddressSaga,
    deletePhoneNumberSaga,
    deleteEmailAddressSaga,
    deleteContactNoteSaga,
    deleteContactEnergySupplierSaga,
    deletePortalUserSaga,
} from './contact/ContactDetailsSaga';
import { fetchContactGroupDetailsSaga } from './contact-group/ContactGroupDetailsSaga';
import {
    fetchContactGroupsSaga,
    deleteContactGroupSaga,
    addContactToGroupSaga,
    deleteComposedGroupSaga,
    attachComposedGroupSaga,
} from './contact-group/ContactGroupsSaga';
import { fetchContactsInGroupSaga, deleteContactInGroupSaga } from './contact-group/ContactsInGroupSaga';
import { fetchContactsSaga, deleteContactSaga, deleteSelectedContactsSaga } from './contact/ContactsSaga';
import { fetchDocumentsSaga } from './document/DocumentsSaga';
import { fetchDocumentDetailsSaga, deleteDocumentSaga } from './document/DocumentDetailsSaga';
import {
    fetchDocumentTemplatesSaga,
    fetchDocumentTemplateSaga,
    deleteDocumentTemplateSaga,
} from './document-template/DocumentTemplatesSaga';
import { fetchEmailsSaga, fetchEmailSaga } from './email/EmailsSaga';
import {
    fetchEmailTemplatesSaga,
    fetchEmailTemplateSaga,
    deleteEmailTemplateSaga,
} from './email-template/EmailTemplatesSaga';
import {
    fetchMailboxDetailsSaga,
    deleteMailboxSaga,
    deleteMailboxUserSaga,
    deleteMailboxIgnoreSaga,
} from './mailbox/MailboxDetailsSaga';
import { fetchMailboxesSaga } from './mailbox/MailboxesSaga';
import { fetchMailgunDomainsSaga } from './mailgun-domains/MailgunDomainsSaga';
import * as MailgunDomainDetailsSaga from './mailgun-domains/MailgunDomainDetailsSaga';
import { fetchMeasuresSaga } from './measure/MeasuresSaga';
import { fetchMeasureSaga } from './measure/MeasureDetailsSaga';
import { fetchOpportunitiesSaga, deleteOpportunitySaga } from './opportunity/OpportunitiesSaga';
import { fetchOpportunitySaga } from './opportunity/OpportunityDetailsSaga';
import { fetchOrdersSaga, deleteOrderSaga } from './order/OrdersSaga';
import { fetchOrderDetailsSaga, updateOrderDetailsSaga } from './order/OrderDetailsSaga';
import { fetchPostalCodeLinksSaga, deletePostalCodeLinkSaga } from './postal-code-link/PostalCodeLinkSaga';
import { fetchProjectsSaga } from './project/ProjectsSaga';
import {
    fetchProjectSaga,
    deleteValueCourseSaga,
    deleteRevenueSaga,
    deleteProjectSaga,
} from './project/ProjectDetailsSaga';
import { fetchProjectRevenueSaga, fetchProjectRevenueDistributionSaga } from './project/ProjectRevenueDetailsSaga';
import { fetchParticipantsProjectSaga } from './participant-project/ParticipantsProjectSaga';
import {
    fetchParticipantProjectDetailsSaga,
    deleteParticipantProjectSaga,
    deleteObligationNumberSaga,
    deleteParticipationMutationSaga,
} from './participant-project/ParticipantProjectDetailsSaga';
import { fetchIntakeDetailsSaga, deleteIntakeMeasureRequestedSaga, deleteIntakeSaga } from './intake/IntakeDetailsSaga';
import { fetchIntakesSaga } from './intake/IntakesSaga';
import {
    fetchHousingFileDetailsSaga,
    deleteHousingFileMeasureTakenSaga,
    deleteHousingFileSaga,
} from './housing-file/HousingFileDetailsSaga';
import { fetchHousingFilesSaga } from './housing-file/HousingFilesSaga';
import {
    fetchQuotationRequestDetailsSaga,
    deleteQuotationRequestSaga,
} from './quotation-request/QuotationRequestDetailsSaga';
import { fetchQuotationRequestsSaga } from './quotation-request/QuotationRequestsSaga';
import { fetchTaskDetailsSaga, deleteTaskSaga } from './task/TaskDetailsSaga';
import { fetchTasksSaga, setTaskFinishedSaga } from './task/TasksSaga';
import { fetchNotesSaga } from './task/NotesSaga';
import { fetchTeamsSaga, deleteTeamSaga } from './team/TeamsSaga';
import { fetchTeamDetailsSaga, deleteTeamUserSaga, updateTeamDetailsSaga } from './team/TeamDetailsSaga';
import { fetchUserDetailsSaga, updateUserDetailsSaga } from './user/UserDetailsSaga';
import { fetchUserSaga } from './user/UsersSaga';
import { meDetailsSaga } from './general/MeDetailsSaga';
import { systemDataSaga } from './general/SystemDataSaga';
import {
    addProductPriceHistorySaga,
    fetchProductDetailsSaga,
    updateProductDetailsSaga,
} from './product/ProductDetailsSaga';
import { deleteProductSaga, fetchProductsSaga } from './product/ProductsSaga';
import { deleteInvoiceFromGridSaga, fetchInvoicesSaga } from './invoice/InvoicesSaga';
import { deleteInvoiceSaga, fetchInvoiceDetailsSaga } from './invoice/InvoiceDetailsSaga';
import { fetchPaymentInvoicesSaga } from './payment-invoice/PaymentInvoicesSaga';
import { fetchWebformsSaga, deleteWebformSaga } from './webform/WebformsSaga';
import { fetchWebformDetailsSaga, updateWebformDetailsSaga } from './webform/WebformDetailsSaga';

export default function* watchSagas() {
    // General
    yield takeLatest('FETCH_SYSTEM_DATA', systemDataSaga);
    yield takeLatest('FETCH_ME_DETAILS', meDetailsSaga);
    yield takeLatest('FETCH_USERS', fetchUserSaga);
    yield takeLatest('FETCH_USER_DETAILS', fetchUserDetailsSaga);
    yield takeLatest('UPDATE_USER', updateUserDetailsSaga);
    // Administration
    yield takeLatest('ADD_ADMINISTRATION_USER', addAdministrationUserSaga);
    yield takeLatest('DELETE_ADMINISTRATION_USER', deleteAdministrationUserSaga);
    yield takeLatest('DELETE_ADMINISTRATION_SEPA', deleteAdministrationSepaSaga);
    yield takeLatest('FETCH_ADMINISTRATION_DETAILS', fetchAdministrationDetailsSaga);
    yield takeLatest('UPDATE_ADMINISTRATION', updateAdministrationDetailsSaga);
    yield takeLatest('DELETE_ADMINISTRATION', deleteAdministrationSaga);
    yield takeLatest('FETCH_ADMINISTRATIONS', fetchAdministrationsSaga);

    // Audit trail
    yield takeLatest('FETCH_AUDIT_TRAIL', fetchAuditTrailSaga);
    // Campaign
    yield takeLatest('FETCH_CAMPAIGNS', fetchCampaignsSaga);
    yield takeLatest('FETCH_CAMPAIGN', fetchCampaignSaga);
    yield takeLatest('DELETE_CAMPAIGN', deleteCampaignSaga);
    // Contact
    yield takeLatest('FETCH_CONTACTS', fetchContactsSaga);
    yield takeLatest('DELETE_CONTACT', deleteContactSaga);
    yield takeLatest('DELETE_SELECTED_CONTACTS', deleteSelectedContactsSaga);
    yield takeLatest('FETCH_CONTACT_DETAILS', fetchContactDetailsSaga);
    yield takeLatest('DELETE_ADDRESS', deleteAddressSaga);
    yield takeLatest('DELETE_PHONE_NUMBER', deletePhoneNumberSaga);
    yield takeLatest('DELETE_EMAIL_ADDRESS', deleteEmailAddressSaga);
    yield takeLatest('DELETE_PORTAL_USER', deletePortalUserSaga);
    yield takeLatest('DELETE_CONTACT_NOTE', deleteContactNoteSaga);
    yield takeLatest('DELETE_CONTACT_ENERGY_SUPPLIER', deleteContactEnergySupplierSaga);
    // Contact group
    yield takeLatest('FETCH_CONTACT_GROUPS', fetchContactGroupsSaga);
    yield takeLatest('DELETE_CONTACT_GROUP', deleteContactGroupSaga);
    yield takeLatest('ADD_CONTACT_TO_GROUP', addContactToGroupSaga);
    yield takeLatest('FETCH_CONTACT_GROUP_DETAILS', fetchContactGroupDetailsSaga);
    yield takeLatest('FETCH_CONTACTS_IN_GROUP', fetchContactsInGroupSaga);
    yield takeLatest('DELETE_CONTACT_IN_GROUP', deleteContactInGroupSaga);
    yield takeLatest('DELETE_COMPOSED_GROUP', deleteComposedGroupSaga);
    yield takeLatest('ATTACH_COMPOSED_GROUP', attachComposedGroupSaga);
    // Documents
    yield takeLatest('FETCH_DOCUMENTS', fetchDocumentsSaga);
    yield takeLatest('DELETE_DOCUMENT', deleteDocumentSaga);
    yield takeLatest('FETCH_DOCUMENT_DETAILS', fetchDocumentDetailsSaga);
    // Document templates
    yield takeLatest('FETCH_DOCUMENT_TEMPLATES', fetchDocumentTemplatesSaga);
    yield takeLatest('FETCH_DOCUMENT_TEMPLATE', fetchDocumentTemplateSaga);
    yield takeLatest('DELETE_DOCUMENT_TEMPLATE', deleteDocumentTemplateSaga);
    // Emails
    yield takeLatest('FETCH_EMAILS', fetchEmailsSaga);
    yield takeLatest('FETCH_EMAIL', fetchEmailSaga);
    // Email templates
    yield takeLatest('FETCH_EMAIL_TEMPLATES', fetchEmailTemplatesSaga);
    yield takeLatest('FETCH_EMAIL_TEMPLATE', fetchEmailTemplateSaga);
    yield takeLatest('DELETE_EMAIL_TEMPLATE', deleteEmailTemplateSaga);
    // Housing Files
    yield takeLatest('FETCH_HOUSING_FILES', fetchHousingFilesSaga);
    yield takeLatest('FETCH_HOUSING_FILE_DETAILS', fetchHousingFileDetailsSaga);
    yield takeLatest('DELETE_HOUSING_FILE', deleteHousingFileSaga);
    yield takeLatest('DELETE_HOUSING_FILE_MEASURE_TAKEN', deleteHousingFileMeasureTakenSaga);
    // Quotation Requests
    yield takeLatest('FETCH_QUOTATION_REQUESTS', fetchQuotationRequestsSaga);
    yield takeLatest('FETCH_QUOTATION_REQUEST_DETAILS', fetchQuotationRequestDetailsSaga);
    yield takeLatest('DELETE_QUOTATION_REQUEST', deleteQuotationRequestSaga);
    // Mailbox
    yield takeLatest('FETCH_MAILBOXES', fetchMailboxesSaga);
    yield takeLatest('FETCH_MAILBOX_DETAILS', fetchMailboxDetailsSaga);
    yield takeLatest('DELETE_MAILBOX', deleteMailboxSaga);
    yield takeLatest('DELETE_MAILBOX_USER', deleteMailboxUserSaga);
    yield takeLatest('DELETE_MAILBOX_IGNORE', deleteMailboxIgnoreSaga);
    // Measure
    yield takeLatest('FETCH_MEASURES', fetchMeasuresSaga);
    yield takeLatest('FETCH_MEASURE', fetchMeasureSaga);
    // Opportunity
    yield takeLatest('DELETE_OPPORTUNITY', deleteOpportunitySaga);
    yield takeLatest('FETCH_OPPORTUNITIES', fetchOpportunitiesSaga);
    yield takeLatest('FETCH_OPPORTUNITY', fetchOpportunitySaga);
    // Order
    yield takeLatest('FETCH_ORDER_DETAILS', fetchOrderDetailsSaga);
    yield takeLatest('UPDATE_ORDER', updateOrderDetailsSaga);
    yield takeLatest('DELETE_ORDER', deleteOrderSaga);
    yield takeLatest('FETCH_ORDERS', fetchOrdersSaga);
    // Postal code links
    yield takeLatest('FETCH_POSTAL_CODE_LINKS', fetchPostalCodeLinksSaga);
    yield takeLatest('DELETE_POSTAL_CODE_LINK', deletePostalCodeLinkSaga);
    // Participant project
    yield takeLatest('FETCH_PARTICIPANTS_PROJECT', fetchParticipantsProjectSaga);
    yield takeLatest('FETCH_PARTICIPANT_PROJECT_DETAILS', fetchParticipantProjectDetailsSaga);
    yield takeLatest('DELETE_PARTICIPANT_PROJECT', deleteParticipantProjectSaga);
    yield takeLatest('DELETE_OBLIGATION_NUMBER', deleteObligationNumberSaga);
    yield takeLatest('DELETE_PARTICIPATION_MUTATION', deleteParticipationMutationSaga);
    // Project
    yield takeLatest('FETCH_PROJECTS', fetchProjectsSaga);
    yield takeLatest('FETCH_PROJECT', fetchProjectSaga);
    yield takeLatest('DELETE_PROJECT', deleteProjectSaga);
    yield takeLatest('FETCH_PROJECT_REVENUE', fetchProjectRevenueSaga);
    yield takeLatest('PROJECT_REVENUE_GET_DISTRIBUTION', fetchProjectRevenueDistributionSaga);
    yield takeLatest('DELETE_VALUE_COURSE', deleteValueCourseSaga);
    yield takeLatest('DELETE_REVENUE', deleteRevenueSaga);
    // Intake
    yield takeLatest('FETCH_INTAKES', fetchIntakesSaga);
    yield takeLatest('FETCH_INTAKE_DETAILS', fetchIntakeDetailsSaga);
    yield takeLatest('DELETE_INTAKE', deleteIntakeSaga);
    yield takeLatest('DELETE_INTAKE_MEASURE_REQUESTED', deleteIntakeMeasureRequestedSaga);
    // Invoice
    yield takeLatest('FETCH_INVOICE_DETAILS', fetchInvoiceDetailsSaga);
    yield takeLatest('FETCH_INVOICES', fetchInvoicesSaga);
    yield takeLatest('DELETE_INVOICE', deleteInvoiceSaga);
    yield takeLatest('DELETE_INVOICE_FROM_GRID', deleteInvoiceFromGridSaga);
    // Payment invoice
    yield takeLatest('FETCH_PAYMENT_INVOICES', fetchPaymentInvoicesSaga);
    // Task / notes
    yield takeLatest('FETCH_TASKS', fetchTasksSaga);
    yield takeLatest('FETCH_NOTES', fetchNotesSaga);
    yield takeLatest('SET_TASK_FINISHED', setTaskFinishedSaga);
    yield takeLatest('FETCH_TASK_DETAILS', fetchTaskDetailsSaga);
    yield takeLatest('DELETE_TASK', deleteTaskSaga);
    // Team
    yield takeLatest('FETCH_TEAMS', fetchTeamsSaga);
    yield takeLatest('FETCH_TEAM_DETAILS', fetchTeamDetailsSaga);
    yield takeLatest('DELETE_TEAM', deleteTeamSaga);
    yield takeLatest('DELETE_TEAM_USER', deleteTeamUserSaga);
    yield takeLatest('UPDATE_TEAM', updateTeamDetailsSaga);

    // Products
    yield takeLatest('ADD_PRODUCT_PRICE_HISTORY', addProductPriceHistorySaga);
    yield takeLatest('FETCH_PRODUCT_DETAILS', fetchProductDetailsSaga);
    yield takeLatest('UPDATE_PRODUCT', updateProductDetailsSaga);
    yield takeLatest('DELETE_PRODUCT', deleteProductSaga);
    yield takeLatest('FETCH_PRODUCTS', fetchProductsSaga);

    // Webform
    yield takeLatest('FETCH_WEBFORMS', fetchWebformsSaga);
    yield takeLatest('FETCH_WEBFORM_DETAILS', fetchWebformDetailsSaga);
    yield takeLatest('DELETE_WEBFORM', deleteWebformSaga);
    yield takeLatest('UPDATE_WEBFORM', updateWebformDetailsSaga);

    // Mailgun domains
    yield takeLatest('FETCH_MAILGUN_DOMAINS', fetchMailgunDomainsSaga);
    yield takeLatest('FETCH_MAILGUN_DOMAIN_DETAILS', MailgunDomainDetailsSaga.fetchMailgunDomainDetailsSaga);
    yield takeLatest('UPDATE_MAILGUN_DOMAIN', MailgunDomainDetailsSaga.updateMailgunDomainDetailsSaga);
}
