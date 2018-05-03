import { takeLatest, takeEvery } from 'redux-saga/effects';

import { fetchAuditTrailSaga } from './audit-trail/AuditTrailSaga';
import { addAdministrationUserSaga, deleteAdministrationUserSaga, fetchAdministrationDetailsSaga, updateAdministrationDetailsSaga } from './administration/AdministrationDetailsSaga';
import { deleteAdministrationSaga, fetchAdministrationsSaga } from './administration/AdministrationsSaga';
import { fetchCampaignsSaga } from './campaign/CampaignsSaga';
import { fetchCampaignSaga } from './campaign/CampaignDetailsSaga';
import { fetchContactDetailsSaga, deleteAddressSaga, deletePhoneNumberSaga, deleteEmailAddressSaga, deleteContactNoteSaga, deleteContactEnergySupplierSaga } from './contact/ContactDetailsSaga';
import { fetchContactGroupDetailsSaga } from './contact-group/ContactGroupDetailsSaga';
import { fetchContactGroupsSaga, deleteContactGroupSaga, addContactToGroupSaga } from './contact-group/ContactGroupsSaga';
import { fetchContactsInGroupSaga, deleteContactInGroupSaga } from './contact-group/ContactsInGroupSaga';
import { fetchContactsSaga, deleteContactSaga } from './contact/ContactsSaga';
import { fetchDocumentsSaga } from './document/DocumentsSaga';
import { fetchDocumentDetailsSaga, deleteDocumentSaga } from './document/DocumentDetailsSaga';
import { fetchDocumentTemplatesSaga, fetchDocumentTemplateSaga } from './document-template/DocumentTemplatesSaga';
import { fetchEmailsSaga, fetchEmailSaga } from './email/EmailsSaga';
import { fetchEmailTemplatesSaga, fetchEmailTemplateSaga } from './email-template/EmailTemplatesSaga';
import { fetchMailboxDetailsSaga, deleteMailboxSaga, deleteMailboxUserSaga } from './mailbox/MailboxDetailsSaga';
import { fetchMailboxesSaga } from './mailbox/MailboxesSaga';
import { fetchMeasuresSaga } from './measure/MeasuresSaga';
import { fetchMeasureSaga } from './measure/MeasureDetailsSaga';
import { fetchOpportunitiesSaga } from './opportunity/OpportunitiesSaga';
import { fetchOpportunitySaga } from './opportunity/OpportunityDetailsSaga';
import { fetchOrdersSaga, deleteOrderSaga } from './order/OrdersSaga';
import { fetchOrderDetailsSaga, updateOrderDetailsSaga } from './order/OrderDetailsSaga';
import { fetchPostalCodeLinksSaga, deletePostalCodeLinkSaga } from './postal-code-link/PostalCodeLinkSaga';
import { fetchProductionProjectsSaga } from './production-project/ProductionProjectsSaga';
import { fetchProductionProjectSaga, deleteValueCourseSaga, deleteRevenueSaga } from './production-project/ProductionProjectDetailsSaga';
import { fetchProductionProjectRevenueSaga } from './production-project/ProductionProjectRevenueDetailsSaga';
import { fetchParticipantsProductionProjectSaga } from './participant-production-project/ParticipantsProductionProjectSaga';
import { fetchParticipantProductionProjectDetailsSaga, deleteParticipantProductionProjectSaga, deleteParticipationTransactionSaga, deleteObligationNumberSaga } from './participant-production-project/ParticipantProductionProjectDetailsSaga';
import {
    fetchIntakeDetailsSaga,
    deleteIntakeMeasureRequestedSaga,
    deleteIntakeSaga,
} from './intake/IntakeDetailsSaga';
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
import { addProductPriceHistorySaga, fetchProductDetailsSaga, updateProductDetailsSaga } from './product/ProductDetailsSaga';
import { deleteProductSaga, fetchProductsSaga } from './product/ProductsSaga';

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
    yield takeLatest('FETCH_ADMINISTRATION_DETAILS', fetchAdministrationDetailsSaga);
    yield takeLatest('UPDATE_ADMINISTRATION', updateAdministrationDetailsSaga);
    yield takeLatest('DELETE_ADMINISTRATION', deleteAdministrationSaga);
    yield takeLatest('FETCH_ADMINISTRATIONS', fetchAdministrationsSaga);

    // Audit trail
    yield takeLatest('FETCH_AUDIT_TRAIL', fetchAuditTrailSaga);
    // Campaign
    yield takeLatest('FETCH_CAMPAIGNS', fetchCampaignsSaga);
    yield takeLatest('FETCH_CAMPAIGN', fetchCampaignSaga);
    // Contact
    yield takeLatest('FETCH_CONTACTS', fetchContactsSaga);
    yield takeLatest('DELETE_CONTACT', deleteContactSaga);
    yield takeLatest('FETCH_CONTACT_DETAILS', fetchContactDetailsSaga);
    yield takeLatest('DELETE_ADDRESS', deleteAddressSaga);
    yield takeLatest('DELETE_PHONE_NUMBER', deletePhoneNumberSaga);
    yield takeLatest('DELETE_EMAIL_ADDRESS', deleteEmailAddressSaga);
    yield takeLatest('DELETE_CONTACT_NOTE', deleteContactNoteSaga);
    yield takeLatest('DELETE_CONTACT_ENERGY_SUPPLIER', deleteContactEnergySupplierSaga);
    // Contact group
    yield takeLatest('FETCH_CONTACT_GROUPS', fetchContactGroupsSaga);
    yield takeLatest('DELETE_CONTACT_GROUP', deleteContactGroupSaga);
    yield takeLatest('ADD_CONTACT_TO_GROUP', addContactToGroupSaga);
    yield takeLatest('FETCH_CONTACT_GROUP_DETAILS', fetchContactGroupDetailsSaga);
    yield takeLatest('FETCH_CONTACTS_IN_GROUP', fetchContactsInGroupSaga);
    yield takeLatest('DELETE_CONTACT_IN_GROUP', deleteContactInGroupSaga);
    // Documents
    yield takeLatest('FETCH_DOCUMENTS', fetchDocumentsSaga);
    yield takeLatest('DELETE_DOCUMENT', deleteDocumentSaga);
    yield takeLatest('FETCH_DOCUMENT_DETAILS', fetchDocumentDetailsSaga);
    // Document templates
    yield takeLatest('FETCH_DOCUMENT_TEMPLATES', fetchDocumentTemplatesSaga);
    yield takeLatest('FETCH_DOCUMENT_TEMPLATE', fetchDocumentTemplateSaga);
    // Emails
    yield takeLatest('FETCH_EMAILS', fetchEmailsSaga);
    yield takeLatest('FETCH_EMAIL', fetchEmailSaga);
    // Email templates
    yield takeLatest('FETCH_EMAIL_TEMPLATES', fetchEmailTemplatesSaga);
    yield takeLatest('FETCH_EMAIL_TEMPLATE', fetchEmailTemplateSaga);
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
    // Measure
    yield takeLatest('FETCH_MEASURES', fetchMeasuresSaga);
    yield takeLatest('FETCH_MEASURE', fetchMeasureSaga);
    // Opportunity
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
    // Participant production project
    yield takeLatest('FETCH_PARTICIPANTS_PRODUCTION_PROJECT', fetchParticipantsProductionProjectSaga);
    yield takeLatest('FETCH_PARTICIPANT_PRODUCTION_PROJECT_DETAILS', fetchParticipantProductionProjectDetailsSaga);
    yield takeLatest('DELETE_PARTICIPANT_PRODUCTION_PROJECT', deleteParticipantProductionProjectSaga);
    yield takeLatest('DELETE_PARTICIPATION_TRANSACTION', deleteParticipationTransactionSaga);
    yield takeLatest('DELETE_OBLIGATION_NUMBER', deleteObligationNumberSaga);
    // Production project
    yield takeLatest('FETCH_PRODUCTION_PROJECTS', fetchProductionProjectsSaga);
    yield takeLatest('FETCH_PRODUCTION_PROJECT', fetchProductionProjectSaga);
    yield takeLatest('FETCH_PRODUCTION_PROJECT_REVENUE', fetchProductionProjectRevenueSaga);
    yield takeLatest('DELETE_VALUE_COURSE', deleteValueCourseSaga);
    yield takeLatest('DELETE_REVENUE', deleteRevenueSaga);
    // Intake
    yield takeLatest('FETCH_INTAKES', fetchIntakesSaga);
    yield takeLatest('FETCH_INTAKE_DETAILS', fetchIntakeDetailsSaga);
    yield takeLatest('DELETE_INTAKE', deleteIntakeSaga);
    yield takeLatest('DELETE_INTAKE_MEASURE_REQUESTED', deleteIntakeMeasureRequestedSaga);
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
}
