import { put, call } from 'redux-saga/effects';
import ContactGroupAPI from '../../api/contact-group/ContactGroupAPI';

export function* fetchContactGroupDetailsSaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const contactGroupDetails = yield call(ContactGroupAPI.fetchContactGroupDetails, id);
        yield put({ type: 'FETCH_CONTACT_GROUP_DETAILS_SUCCESS', contactGroupDetails });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_CONTACT_GROUP_DETAILS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* updateContactGroupDetailsSaga({ contactGroup }) {
    try {
        const contactGroupDetails = yield call(ContactGroupAPI.updateContactGroup, contactGroup);
        yield put({ type: 'UPDATE_CONTACT_GROUP_DETAILS_SUCCESS', contactGroupDetails });
    } catch (error) {
        yield put({ type: 'UPDATE_CONTACT_GROUP_DETAILS_ERROR', error });
    }
}
