import { put, call } from 'redux-saga/effects';
import ContactsInGroupAPI from '../../api/contact-group/ContactsInGroupAPI';

export function* fetchContactsInGroupSaga({ contactGroup }) {
    try {
        const contactsInGroup = yield call(ContactsInGroupAPI.fetchContactsInGroup, contactGroup);
        yield put({ type: 'FETCH_CONTACTS_IN_GROUP_SUCCESS', contactsInGroup });
    } catch (error) {
        yield put({ type: 'FETCH_CONTACTS_IN_GROUP_ERROR', error });
    }
}

export function* deleteContactInGroupSaga({contactGroup, id}) {
    try {
        yield call(ContactsInGroupAPI.deleteContactInGroup, contactGroup, id);
        yield put({ type: 'DELETE_CONTACT_IN_GROUP_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_CONTACT_IN_GROUP_ERROR', error });
    }
}
