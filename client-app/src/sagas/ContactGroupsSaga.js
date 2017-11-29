import { put, call } from 'redux-saga/effects';
import ContactGroupAPI from '../api/ContactGroupAPI';

export function* fetchContactGroupsSaga() {
    try {
        const contactGroups = yield call(ContactGroupAPI.fetchContactGroups);
        yield [
            put({ type: 'FETCH_CONTACT_GROUPS_SUCCESS', contactGroups }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_CONTACTS_ERROR', error });
    }
}

export function* deleteContactGroupSaga({ id }) {
    try {
        yield call(ContactGroupAPI.deleteContactGroup, id);
        yield put({ type: 'DELETE_CONTACT_GROUP_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_CONTACT_GROUP_ERROR', error });
    }
}

export function* addContactToGroupSaga({ contact }) {
    try {
        yield call(ContactGroupAPI.addContactToGroup, contact);
        yield put({ type: 'ADD_CONTACT_TO_GROUP_SUCCESS', contact });
    } catch (error) {
        yield put({ type: 'ADD_CONTACT_TO_GROUP_ERROR', error });
    }
}
