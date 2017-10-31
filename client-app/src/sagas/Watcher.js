import { takeLatest } from 'redux-saga/effects';
import { userDetailsSaga } from './UserDetailsSaga';
import { systemDataSaga } from './SystemDataSaga';
import { contactsSaga } from './ContactsSaga';
import { contactDetailsSaga, deleteAddressSaga, deletePhoneNumberSaga, deleteEmailAddressSaga, deleteContactNoteSaga } from './ContactDetailsSaga';

export default function* watchSagas() {
    yield takeLatest('FETCH_SYSTEM_DATA', systemDataSaga);
    yield takeLatest('FETCH_USER_DETAILS', userDetailsSaga);
    yield takeLatest('FETCH_CONTACTS', contactsSaga);
    yield takeLatest('FETCH_CONTACT_DETAILS', contactDetailsSaga);
    yield takeLatest('DELETE_ADDRESS', deleteAddressSaga);
    yield takeLatest('DELETE_PHONE_NUMBER', deletePhoneNumberSaga);
    yield takeLatest('DELETE_EMAIL_ADDRESS', deleteEmailAddressSaga);
    yield takeLatest('DELETE_NOTE', deleteContactNoteSaga);
};