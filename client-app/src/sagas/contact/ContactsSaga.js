import { put, call } from 'redux-saga/effects';
import ContactsAPI from '../../api/contact/ContactsAPI';
import { hashHistory } from 'react-router';

export function* fetchContactsSaga({ filters, extraFilters, sorts, pagination, filterType, dataControleType }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const contacts = yield call(ContactsAPI.fetchContacts, {
            filters,
            extraFilters,
            sorts,
            pagination,
            filterType,
            dataControleType,
        });
        yield put({ type: 'FETCH_CONTACTS_SUCCESS', contacts });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_CONTACTS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteContactSaga({ id }) {
    try {
        yield call(ContactsAPI.deleteContact, id);
        yield put({ type: 'DELETE_CONTACT_SUCCESS', id });
        hashHistory.push(`/contacten`);
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_CONTACT_ERROR', error });
    }
}

export function* deleteSelectedContactsSaga({ contactIds }) {
    try {
        yield call(ContactsAPI.deleteContacts, contactIds);
        yield put({ type: 'DELETE_CONTACT_SUCCESS', contactIds });
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_CONTACT_ERROR', error });
    }
}

export function* mergeSelectedContactsSaga({ contactIds }) {
    try {
        yield call(ContactsAPI.mergeContacts, contactIds);
        yield put({ type: 'MERGE_CONTACT_SUCCESS', contactIds });
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'MERGE_CONTACT_ERROR', error });
    }
}
