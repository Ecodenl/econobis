import { put, call } from 'redux-saga/effects';
import ContactGroupAPI from '../api/ContactGroupAPI';

export function* fetchContactGroupDetailsSaga({id}) {
    try {
        const contactGroupDetails = yield call(ContactGroupAPI.fetchContactGroupDetails, id);
        yield [
            put({ type: 'FETCH_CONTACT_GROUP_DETAILS_SUCCESS', contactGroupDetails }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_CONTACT_GROUP_DETAILS_ERROR', error });
    }
}

export function* updateContactGroupDetailsSaga({contactGroup}) {
    try {
        const contactGroupDetails = yield call(ContactGroupAPI.updateContactGroup, contactGroup);
        yield put({ type: 'DELETE_CONTACT_GROUP_DETAILS_SUCCESS', contactGroupDetails });
    } catch (error) {
        yield put({ type: 'DELETE_CONTACT_GROUP_DETAILS_ERROR', error });
    }
}
