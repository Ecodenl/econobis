import { put, call } from 'redux-saga/effects';
import ContactsInGroupAPI from '../../api/contact-group/ContactsInGroupAPI';

export function* deleteContactInGroupSaga({ contactGroup, id }) {
    try {
        yield call(ContactsInGroupAPI.deleteContactInGroup, contactGroup, id);
        yield put({ type: 'DELETE_CONTACT_IN_GROUP_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_CONTACT_IN_GROUP_ERROR', error });
    }
}

export function* updateContactInGroupSaga({ contactGroup, id, memberToGroupSince }) {
    try {
        yield call(ContactsInGroupAPI.updateContactInGroup, contactGroup, id, memberToGroupSince);
        yield put({ type: 'UPDATE_CONTACT_IN_GROUP_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'UPDATE_CONTACT_IN_GROUP_ERROR', error });
    }
}
