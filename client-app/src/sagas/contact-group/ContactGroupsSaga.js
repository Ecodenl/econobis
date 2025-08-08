import { put, call, all } from 'redux-saga/effects';
import ContactGroupAPI from '../../api/contact-group/ContactGroupAPI';

export function* fetchContactGroupsSaga({ filters, sorts, pagination }) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_CONTACT_GROUPS_LOADING' });
        const contactGroups = yield call(ContactGroupAPI.fetchContactGroups, { filters, sorts, pagination });
        yield all([
            put({ type: 'FETCH_CONTACT_GROUPS_LOADING_SUCCESS' }),
            put({ type: 'FETCH_CONTACT_GROUPS_SUCCESS', contactGroups }),
        ]);
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_CONTACT_GROUPS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteContactGroupSaga({ id, successAction }) {
    try {
        yield call(ContactGroupAPI.deleteContactGroup, id);
        yield put({ type: 'DELETE_CONTACT_GROUP_SUCCESS', id });
        successAction();
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
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

export function* deleteComposedGroupSaga({ contactGroupId, contactGroupToDetachId }) {
    try {
        yield call(ContactGroupAPI.deleteComposedGroup, { contactGroupId, contactGroupToDetachId });
        yield put({ type: 'DELETE_COMPOSED_GROUP_SUCCESS', contactGroupToDetachId });
    } catch (error) {
        yield put({ type: 'DELETE_COMPOSED_GROUP_ERROR', error });
    }
}

export function* attachComposedGroupSaga({ contactGroupId, contactGroupToAttachId }) {
    try {
        yield call(ContactGroupAPI.attachComposedGroup, { contactGroupId, contactGroupToAttachId });
        yield put({ type: 'ATTACH_COMPOSED_GROUP_SUCCESS', contactGroupId });
    } catch (error) {
        yield put({ type: 'ATTACH_COMPOSED_GROUP_ERROR', error });
    }
}

export function* deleteComposedExceptGroupSaga({ contactGroupId, contactGroupToDetachId }) {
    try {
        yield call(ContactGroupAPI.deleteComposedExceptGroup, { contactGroupId, contactGroupToDetachId });
        yield put({ type: 'DELETE_COMPOSED_GROUP_SUCCESS', contactGroupToDetachId });
    } catch (error) {
        yield put({ type: 'DELETE_COMPOSED_GROUP_ERROR', error });
    }
}

export function* attachComposedExceptGroupSaga({ contactGroupId, contactGroupToAttachId }) {
    try {
        yield call(ContactGroupAPI.attachComposedExceptGroup, { contactGroupId, contactGroupToAttachId });
        yield put({ type: 'ATTACH_COMPOSED_EXCEPT_GROUP_SUCCESS', contactGroupId });
    } catch (error) {
        yield put({ type: 'ATTACH_COMPOSED_EXCEPT_GROUP_ERROR', error });
    }
}
