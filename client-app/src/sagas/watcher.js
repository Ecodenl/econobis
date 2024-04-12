import { takeLatest } from 'redux-saga/effects';

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
import {
    deleteAddressSaga,
    deleteAddressEnergySupplierSaga,
    deleteContactNoteSaga,
    deleteEmailAddressSaga,
    deletePhoneNumberSaga,
    deletePortalUserSaga,
    fetchContactDetailsSaga,
} from './contact/ContactDetailsSaga';
import { fetchContactGroupDetailsSaga } from './contact-group/ContactGroupDetailsSaga';
import {
    addContactToGroupSaga,
    attachComposedExceptGroupSaga,
    attachComposedGroupSaga,
    deleteComposedExceptGroupSaga,
    deleteComposedGroupSaga,
    deleteContactGroupSaga,
    fetchContactGroupsSaga,
} from './contact-group/ContactGroupsSaga';
import { deleteContactInGroupSaga, updateContactInGroupSaga } from './contact-group/ContactsInGroupSaga';
import {
    deleteContactSaga,
    deleteSelectedContactsSaga,
    fetchContactsSaga,
    mergeSelectedContactsSaga,
} from './contact/ContactsSaga';
import { fetchDocumentsSaga } from './document/DocumentsSaga';
import { deleteDocumentSaga, fetchDocumentDetailsSaga } from './document/DocumentDetailsSaga';
import {
    deleteDocumentTemplateSaga,
    fetchDocumentTemplateSaga,
    fetchDocumentTemplatesSaga,
} from './document-template/DocumentTemplatesSaga';
import { fetchEmailSaga, fetchEmailsSaga } from './email/EmailsSaga';
import {
    deleteEmailTemplateSaga,
    fetchEmailTemplateSaga,
    fetchEmailTemplatesSaga,
} from './email-template/EmailTemplatesSaga';
import {
    deleteMailboxIgnoreSaga,
    deleteMailboxSaga,
    deleteMailboxUserSaga,
    fetchMailboxDetailsSaga,
} from './mailbox/MailboxDetailsSaga';
import { fetchMailboxesSaga } from './mailbox/MailboxesSaga';
import { fetchMailgunDomainsSaga } from './mailgun-domains/MailgunDomainsSaga';
import * as MailgunDomainDetailsSaga from './mailgun-domains/MailgunDomainDetailsSaga';
import { fetchMeasuresSaga } from './measure/MeasuresSaga';
import { fetchMeasureSaga } from './measure/MeasureDetailsSaga';
import { deleteOpportunitySaga, fetchOpportunitiesSaga } from './opportunity/OpportunitiesSaga';
import { fetchOpportunitySaga } from './opportunity/OpportunityDetailsSaga';
import { deleteOrderSaga, fetchOrdersSaga } from './order/OrdersSaga';
import { fetchOrderDetailsSaga, updateOrderDetailsSaga } from './order/OrderDetailsSaga';
import { deletePostalCodeLinkSaga, fetchPostalCodeLinksSaga } from './postal-code-link/PostalCodeLinkSaga';
import { fetchProjectsSaga } from './project/ProjectsSaga';
import {
    deleteProjectSaga,
    deleteRevenueSaga,
    deleteRevenuesKwhSaga,
    deleteRevenuePartsKwhSaga,
    deleteValueCourseSaga,
    fetchProjectSaga,
} from './project/ProjectDetailsSaga';
import { fetchProjectRevenueDistributionSaga, fetchProjectRevenueSaga } from './project/ProjectRevenueDetailsSaga';
import { fetchRevenueDistributionKwhSaga, fetchRevenuesKwhSaga } from './project/RevenuesKwhDetailsSaga';
import { fetchRevenueDistributionPartsKwhSaga, fetchRevenuePartsKwhSaga } from './project/RevenuePartsKwhDetailsSaga';
import { fetchParticipantsProjectSaga } from './participant-project/ParticipantsProjectSaga';
import {
    deleteObligationNumberSaga,
    deleteParticipantProjectSaga,
    fetchParticipantProjectDetailsSaga,
} from './participant-project/ParticipantProjectDetailsSaga';
import { deleteIntakeMeasureRequestedSaga, deleteIntakeSaga, fetchIntakeDetailsSaga } from './intake/IntakeDetailsSaga';
import { fetchIntakesSaga } from './intake/IntakesSaga';
import {
    deleteHousingFileSpecificationSaga,
    deleteHousingFileHousingStatusSaga,
    deleteHousingFileSaga,
    fetchHousingFileDetailsSaga,
} from './housing-file/HousingFileDetailsSaga';
import { fetchHousingFilesSaga } from './housing-file/HousingFilesSaga';
import { fetchHousingFileSpecificationsSaga } from './housing-file-specification/HousingFileSpecificationsSaga';
import {
    deleteQuotationRequestSaga,
    fetchQuotationRequestDetailsSaga,
} from './quotation-request/QuotationRequestDetailsSaga';
import { fetchQuotationRequestsSaga } from './quotation-request/QuotationRequestsSaga';
import { deleteTaskSaga, fetchTaskDetailsSaga } from './task/TaskDetailsSaga';
import { fetchTasksSaga, setTaskFinishedSaga } from './task/TasksSaga';
import { fetchNotesSaga } from './task/NotesSaga';
import { deleteTeamSaga, fetchTeamsSaga } from './team/TeamsSaga';
import {
    deleteTeamContactGroupSaga,
    deleteTeamDocumentCreatedFromSaga,
    deleteTeamUserSaga,
    fetchTeamDetailsSaga,
    updateTeamDetailsSaga,
} from './team/TeamDetailsSaga';
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
import {
    deleteInvoiceSaga,
    fetchInvoiceDetailsSaga,
    fetchInvoiceFromTwinfieldDetailsSaga,
} from './invoice/InvoiceDetailsSaga';
import { fetchPaymentInvoicesSaga } from './payment-invoice/PaymentInvoicesSaga';
import { deleteWebformSaga, fetchWebformsSaga } from './webform/WebformsSaga';
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
    // Contact
    yield takeLatest('FETCH_CONTACTS', fetchContactsSaga);
    yield takeLatest('DELETE_CONTACT', deleteContactSaga);
    yield takeLatest('DELETE_SELECTED_CONTACTS', deleteSelectedContactsSaga);
    yield takeLatest('MERGE_SELECTED_CONTACTS', mergeSelectedContactsSaga);
    yield takeLatest('FETCH_CONTACT_DETAILS', fetchContactDetailsSaga);
    yield takeLatest('DELETE_ADDRESS', deleteAddressSaga);
    yield takeLatest('DELETE_PHONE_NUMBER', deletePhoneNumberSaga);
    yield takeLatest('DELETE_EMAIL_ADDRESS', deleteEmailAddressSaga);
    yield takeLatest('DELETE_PORTAL_USER', deletePortalUserSaga);
    yield takeLatest('DELETE_CONTACT_NOTE', deleteContactNoteSaga);
    yield takeLatest('DELETE_ADDRESS_ENERGY_SUPPLIER', deleteAddressEnergySupplierSaga);
    // Contact group
    yield takeLatest('FETCH_CONTACT_GROUPS', fetchContactGroupsSaga);
    yield takeLatest('DELETE_CONTACT_GROUP', deleteContactGroupSaga);
    yield takeLatest('ADD_CONTACT_TO_GROUP', addContactToGroupSaga);
    yield takeLatest('FETCH_CONTACT_GROUP_DETAILS', fetchContactGroupDetailsSaga);
    yield takeLatest('DELETE_CONTACT_IN_GROUP', deleteContactInGroupSaga);
    yield takeLatest('UPDATE_CONTACT_IN_GROUP', updateContactInGroupSaga);
    yield takeLatest('DELETE_COMPOSED_GROUP', deleteComposedGroupSaga);
    yield takeLatest('ATTACH_COMPOSED_GROUP', attachComposedGroupSaga);
    yield takeLatest('DELETE_COMPOSED_EXCEPT_GROUP', deleteComposedExceptGroupSaga);
    yield takeLatest('ATTACH_COMPOSED_EXCEPT_GROUP', attachComposedExceptGroupSaga);
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
    yield takeLatest('DELETE_HOUSING_FILE_SPECIFICATION', deleteHousingFileSpecificationSaga);
    yield takeLatest('DELETE_HOUSING_FILE_HOUSING_STATUS', deleteHousingFileHousingStatusSaga);
    // Housing File Specifications
    yield takeLatest('FETCH_HOUSING_FILE_SPECIFICATIONS', fetchHousingFileSpecificationsSaga);
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
    // Project
    yield takeLatest('FETCH_PROJECTS', fetchProjectsSaga);
    yield takeLatest('FETCH_PROJECT', fetchProjectSaga);
    yield takeLatest('DELETE_PROJECT', deleteProjectSaga);
    yield takeLatest('FETCH_PROJECT_REVENUE', fetchProjectRevenueSaga);
    yield takeLatest('FETCH_REVENUES_KWH', fetchRevenuesKwhSaga);
    yield takeLatest('FETCH_REVENUE_PARTS_KWH', fetchRevenuePartsKwhSaga);
    yield takeLatest('PROJECT_REVENUE_GET_DISTRIBUTION', fetchProjectRevenueDistributionSaga);
    yield takeLatest('REVENUES_KWH_GET_DISTRIBUTION', fetchRevenueDistributionKwhSaga);
    yield takeLatest('REVENUES_KWH_GET_DISTRIBUTION_PARTS', fetchRevenueDistributionPartsKwhSaga);
    yield takeLatest('DELETE_VALUE_COURSE', deleteValueCourseSaga);
    yield takeLatest('DELETE_REVENUE', deleteRevenueSaga);
    yield takeLatest('DELETE_REVENUES_KWH', deleteRevenuesKwhSaga);
    yield takeLatest('DELETE_REVENUE_PARTS_KWH', deleteRevenuePartsKwhSaga);
    // Intake
    yield takeLatest('FETCH_INTAKES', fetchIntakesSaga);
    yield takeLatest('FETCH_INTAKE_DETAILS', fetchIntakeDetailsSaga);
    yield takeLatest('DELETE_INTAKE', deleteIntakeSaga);
    yield takeLatest('DELETE_INTAKE_MEASURE_REQUESTED', deleteIntakeMeasureRequestedSaga);
    // Invoice
    yield takeLatest('FETCH_INVOICE_DETAILS', fetchInvoiceDetailsSaga);
    yield takeLatest('FETCH_INVOICE_FROM_TWINFIELD_DETAILS', fetchInvoiceFromTwinfieldDetailsSaga);
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
    yield takeLatest('DELETE_TEAM_CONTACT_GROUP', deleteTeamContactGroupSaga);
    yield takeLatest('DELETE_TEAM_DOCUMENT_CREATED_FROM', deleteTeamDocumentCreatedFromSaga);
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
