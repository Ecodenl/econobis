import { put, call } from 'redux-saga/effects';
import RegistrationDetailsAPI from '../../api/registration/RegistrationDetailsAPI';

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

export function* deleteRegistrationSaga({ id }) {
    try {
        yield call(RegistrationsAPI.deleteRegistration, id);
        yield put({ type: 'DELETE_CONTACT_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_CONTACT_ERROR', error });
    }
}

export function* deleteRegistrationMeasureTakenSaga({ id }) {
    try {
        yield call(RegistrationDetailsAPI.deleteRegistrationMeasureTaken, id);
        yield put({ type: 'DELETE_REGISTRATION_MEASURE_TAKEN_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_REGISTRATION_MEASURE_TAKEN_ERROR', error });
    }
}

export function* deleteRegistrationMeasureRequestedSaga({ id }) {
    try {
        yield call(RegistrationDetailsAPI.deleteRegistrationMeasureRequested, id);
        yield put({ type: 'DELETE_REGISTRATION_MEASURE_REQUESTED_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_REGISTRATION_MEASURE_REQUESTED_ERROR', error });
    }
}

export function* deleteRegistrationNoteSaga({ id }) {
    try {
        yield call(RegistrationDetailsAPI.deleteRegistrationNote, id);
        yield put({ type: 'DELETE_REGISTRATION_NOTE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_REGISTRATION_NOTE_ERROR', error });
    }
}