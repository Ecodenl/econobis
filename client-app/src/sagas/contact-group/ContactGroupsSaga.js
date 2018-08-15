import {put, call, all} from 'redux-saga/effects';
import ContactGroupAPI from '../../api/contact-group/ContactGroupAPI';
import {hashHistory} from "react-router";

export function* fetchContactGroupsSaga({filters, sorts, pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_CONTACT_GROUPS_LOADING' });
        const contactGroups = yield call(ContactGroupAPI.fetchContactGroups, {filters, sorts, pagination});
        yield all([
            put({ type: 'FETCH_CONTACT_GROUPS_LOADING_SUCCESS'}),
            put({ type: 'FETCH_CONTACT_GROUPS_SUCCESS', contactGroups }),
        ]);
    } catch (error) {
        yield put({ type: 'FETCH_CONTACT_GROUPS_ERROR', error });
    }
}

export function* deleteContactGroupSaga({ id }) {
    try {
        yield call(ContactGroupAPI.deleteContactGroup, id);
        yield put({ type: 'DELETE_CONTACT_GROUP_SUCCESS', id });
        hashHistory.push(`/contact-groepen`);
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
