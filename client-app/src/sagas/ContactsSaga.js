import { put, call } from 'redux-saga/effects';
import ContactsAPI from '../api/ContactsAPI';

export function* fetchContactsSaga({filters, sorts}) {
    try {
        const contacts = yield call(ContactsAPI.getContacts, {filters, sorts});
        yield [
            put({ type: 'FETCH_CONTACTS_SUCCESS', contacts }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_CONTACTS_ERROR', error });
    }
}

export function* deleteContactSaga({ id }) {
    try {
        yield call(ContactsAPI.deleteContact, id);
        yield put({ type: 'DELETE_CONTACT_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_CONTACT_ERROR', error });
    }
}