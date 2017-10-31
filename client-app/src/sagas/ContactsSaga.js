import { put, call } from 'redux-saga/effects';
import ContactsAPI from '../api/ContactsAPI';

export function* contactsSaga({filters, sorts}) {
    try {
        const contacts = yield call(ContactsAPI.getContacts, {filters, sorts});
        yield [
            put({ type: 'FETCH_CONTACTS_SUCCESS', contacts }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_CONTACTS_ERROR', error });
    }
}