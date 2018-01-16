import { put, call } from 'redux-saga/effects';
import ContactsAPI from '../../api/contact/ContactsAPI';

export function* fetchContactsSaga({filters, sorts, pagination}) {
    try {
        const contacts = yield call(ContactsAPI.fetchContacts, {filters, sorts, pagination});
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