import { takeLatest } from 'redux-saga/effects';
import { meDetailsSaga } from './MeDetailsSaga';
import { systemDataSaga } from './SystemDataSaga';
import { fetchContactsSaga, deleteContactSaga } from './ContactsSaga';
import { fetchContactDetailsSaga, deleteAddressSaga, deletePhoneNumberSaga, deleteEmailAddressSaga, deleteContactNoteSaga } from './ContactDetailsSaga';
import { fetchUserSaga } from './UsersSaga';
import { fetchUserDetailsSaga } from './UserDetailsSaga';
import { fetchContactGroupsSaga, deleteContactGroupSaga, addContactToGroupSaga } from './ContactGroupsSaga';
import { fetchContactGroupDetailsSaga, updateContactGroupDetailsSaga } from './ContactGroupDetailsSaga';
import { fetchContactsInGroupSaga, deleteContactInGroupSaga } from './ContactsInGroupSaga';

export default function* watchSagas() {
    yield takeLatest('FETCH_SYSTEM_DATA', systemDataSaga);
    yield takeLatest('FETCH_ME_DETAILS', meDetailsSaga);
    yield takeLatest('FETCH_USERS', fetchUserSaga);
    yield takeLatest('FETCH_USER_DETAILS', fetchUserDetailsSaga);
    yield takeLatest('FETCH_CONTACTS', fetchContactsSaga);
    yield takeLatest('DELETE_CONTACT', deleteContactSaga);
    yield takeLatest('FETCH_CONTACT_DETAILS', fetchContactDetailsSaga);
    yield takeLatest('DELETE_ADDRESS', deleteAddressSaga);
    yield takeLatest('DELETE_PHONE_NUMBER', deletePhoneNumberSaga);
    yield takeLatest('DELETE_EMAIL_ADDRESS', deleteEmailAddressSaga);
    yield takeLatest('DELETE_NOTE', deleteContactNoteSaga);
    yield takeLatest('FETCH_CONTACT_GROUPS', fetchContactGroupsSaga);
    yield takeLatest('DELETE_CONTACT_GROUP', deleteContactGroupSaga);
    yield takeLatest('ADD_CONTACT_TO_GROUP', addContactToGroupSaga);
    yield takeLatest('FETCH_CONTACT_GROUP_DETAILS', fetchContactGroupDetailsSaga);
    yield takeLatest('UPDATE_CONTACT_GROUP_DETAILS', updateContactGroupDetailsSaga);
    yield takeLatest('FETCH_CONTACTS_IN_GROUP', fetchContactsInGroupSaga);
    yield takeLatest('DELETE_CONTACT_IN_GROUP', deleteContactInGroupSaga);
}
