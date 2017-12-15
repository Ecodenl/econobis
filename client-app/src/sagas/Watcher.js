import { takeLatest } from 'redux-saga/effects';
import { meDetailsSaga } from './MeDetailsSaga';
import { systemDataSaga } from './SystemDataSaga';
import { fetchContactsSaga, deleteContactSaga } from './ContactsSaga';
import { fetchContactDetailsSaga, deleteAddressSaga, deletePhoneNumberSaga, deleteEmailAddressSaga, deleteContactNoteSaga } from './ContactDetailsSaga';
import { fetchUserSaga } from './UsersSaga';
import { fetchUserDetailsSaga } from './UserDetailsSaga';
import { fetchRegistrationsSaga } from './RegistrationsSaga';
import { fetchOpportunitiesSaga, fetchOpportunitySaga } from './OpportunitiesSaga';
import { fetchRegistrationDetailsSaga, deleteRegistrationNoteSaga, deleteRegistrationMeasureTakenSaga, deleteRegistrationMeasureRequestedSaga, deleteRegistrationSaga } from './RegistrationDetailsSaga';
import { fetchContactGroupsSaga, deleteContactGroupSaga, addContactToGroupSaga } from './ContactGroupsSaga';
import { fetchContactGroupDetailsSaga, updateContactGroupDetailsSaga } from './ContactGroupDetailsSaga';
import { fetchContactsInGroupSaga, deleteContactInGroupSaga } from './ContactsInGroupSaga';
import { fetchTasksSaga, setTaskCompletedSaga } from './task/TasksSaga';
import { fetchTaskDetailsSaga, deleteTaskSaga } from './task/TaskDetailsSaga';

export default function* watchSagas() {
    yield takeLatest('FETCH_SYSTEM_DATA', systemDataSaga);
    yield takeLatest('FETCH_ME_DETAILS', meDetailsSaga);
    yield takeLatest('FETCH_USERS', fetchUserSaga);
    yield takeLatest('FETCH_USER_DETAILS', fetchUserDetailsSaga);
    // Contact
    yield takeLatest('FETCH_CONTACTS', fetchContactsSaga);
    yield takeLatest('DELETE_CONTACT', deleteContactSaga);
    yield takeLatest('FETCH_CONTACT_DETAILS', fetchContactDetailsSaga);
    yield takeLatest('DELETE_ADDRESS', deleteAddressSaga);
    yield takeLatest('DELETE_PHONE_NUMBER', deletePhoneNumberSaga);
    yield takeLatest('DELETE_EMAIL_ADDRESS', deleteEmailAddressSaga);
    yield takeLatest('DELETE_NOTE', deleteContactNoteSaga);
    // Registration
    yield takeLatest('FETCH_REGISTRATIONS', fetchRegistrationsSaga);
    yield takeLatest('FETCH_REGISTRATION_DETAILS', fetchRegistrationDetailsSaga);
    yield takeLatest('DELETE_REGISTRATION', deleteRegistrationSaga);
    yield takeLatest('DELETE_REGISTRATION_NOTE', deleteRegistrationNoteSaga);
    yield takeLatest('DELETE_REGISTRATION_MEASURE_TAKEN', deleteRegistrationMeasureTakenSaga);
    yield takeLatest('DELETE_REGISTRATION_MEASURE_REQUESTED', deleteRegistrationMeasureRequestedSaga);
    // Contact group
    yield takeLatest('FETCH_CONTACT_GROUPS', fetchContactGroupsSaga);
    yield takeLatest('DELETE_CONTACT_GROUP', deleteContactGroupSaga);
    yield takeLatest('ADD_CONTACT_TO_GROUP', addContactToGroupSaga);
    yield takeLatest('FETCH_CONTACT_GROUP_DETAILS', fetchContactGroupDetailsSaga);
    yield takeLatest('FETCH_CONTACTS_IN_GROUP', fetchContactsInGroupSaga);
    yield takeLatest('DELETE_CONTACT_IN_GROUP', deleteContactInGroupSaga);
    yield takeLatest('FETCH_OPPORTUNITIES', fetchOpportunitiesSaga);
    yield takeLatest('FETCH_OPPORTUNITY', fetchOpportunitySaga);

    // Task
    yield takeLatest('FETCH_TASKS', fetchTasksSaga);
    yield takeLatest('SET_TASK_COMPLETED', setTaskCompletedSaga);
    yield takeLatest('FETCH_TASK_DETAILS', fetchTaskDetailsSaga);
    yield takeLatest('DELETE_TASK', deleteTaskSaga);

};