import { put, call } from 'redux-saga/effects';
import RegistrationDetailsAPI from '../api/registration/RegistrationDetailsAPI';
import RegistrationNoteAPI from '../api/registration/RegistrationNoteAPI';

export function* fetchRegistrationDetailsSaga({ payload }) {
    try {
        const registrationDetails = yield call(RegistrationDetailsAPI.fetchRegistrationDetails, payload);
        yield [
            put({ type: 'FETCH_REGISTRATION_DETAILS_SUCCESS', registrationDetails }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_REGISTRATION_DETAILS_ERROR', error });
    }
}

export function* deleteRegistrationNoteSaga({ id }) {
    try {
        yield call(RegistrationNoteAPI.deleteRegistrationNote, id);
        yield put({ type: 'DELETE_REGISTRATION_NOTE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_REGISTRATION_NOTE_ERROR', error });
    }
}