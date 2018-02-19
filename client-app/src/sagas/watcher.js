import { takeLatest, takeEvery } from 'redux-saga/effects';

import { fetchAuditTrailSaga } from './audit-trail/AuditTrailSaga';
import { fetchCampaignsSaga } from './campaign/CampaignsSaga';
import { fetchCampaignSaga } from './campaign/CampaignDetailsSaga';
import { fetchContactDetailsSaga, deleteAddressSaga, deletePhoneNumberSaga, deleteEmailAddressSaga, deleteContactNoteSaga } from './contact/ContactDetailsSaga';
import { fetchContactGroupDetailsSaga, updateContactGroupDetailsSaga } from './contact-group/ContactGroupDetailsSaga';
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
import { fetchMeasuresSaga, fetchMeasureSaga } from './measure/MeasuresSaga';
import { fetchOpportunitiesSaga } from './opportunity/OpportunitiesSaga';
import { fetchOpportunitySaga } from './opportunity/OpportunityDetailsSaga';
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
import { fetchTaskDetailsSaga, deleteTaskSaga } from './task/TaskDetailsSaga';
import { fetchTasksSaga, setTaskFinishedSaga } from './task/TasksSaga';
import { fetchNotesSaga } from './task/NotesSaga';
import { fetchTeamsSaga, deleteTeamSaga } from './team/TeamsSaga';
import { fetchTeamDetailsSaga, deleteTeamUserSaga } from './team/TeamDetailsSaga';
import { fetchUserDetailsSaga } from './user/UserDetailsSaga';
import { fetchUserSaga } from './user/UsersSaga';
import { meDetailsSaga } from './general/MeDetailsSaga';
import { systemDataSaga } from './general/SystemDataSaga';

export default function* watchSagas() {
    // General
    yield takeLatest('FETCH_SYSTEM_DATA', systemDataSaga);
    yield takeLatest('FETCH_ME_DETAILS', meDetailsSaga);
    yield takeLatest('FETCH_USERS', fetchUserSaga);
    yield takeLatest('FETCH_USER_DETAILS', fetchUserDetailsSaga);
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
    yield takeLatest('DELETE_NOTE', deleteContactNoteSaga);
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
}
