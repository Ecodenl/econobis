import { put, call } from 'redux-saga/effects';
import IntakeDetailsAPI from '../../api/intake/IntakeDetailsAPI';

export function* fetchIntakeDetailsSaga({ payload }) {
    try {
        const intakeDetails = yield call(IntakeDetailsAPI.fetchIntakeDetails, payload);
        yield put({ type: 'FETCH_INTAKE_DETAILS_SUCCESS', intakeDetails });
    } catch (error) {
        yield put({ type: 'FETCH_INTAKE_DETAILS_ERROR', error });
    }
}

export function* deleteIntakeSaga({ id }) {
    try {
        yield call(IntakesAPI.deleteIntake, id);
        yield put({ type: 'DELETE_CONTACT_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_CONTACT_ERROR', error });
    }
}

export function* deleteIntakeMeasureTakenSaga({ id }) {
    try {
        yield call(IntakeDetailsAPI.deleteIntakeMeasureTaken, id);
        yield put({ type: 'DELETE_INTAKE_MEASURE_TAKEN_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_INTAKE_MEASURE_TAKEN_ERROR', error });
    }
}

export function* deleteIntakeMeasureRequestedSaga({ id }) {
    try {
        yield call(IntakeDetailsAPI.deleteIntakeMeasureRequested, id);
        yield put({ type: 'DELETE_INTAKE_MEASURE_REQUESTED_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_INTAKE_MEASURE_REQUESTED_ERROR', error });
    }
}

export function* deleteIntakeNoteSaga({ id }) {
    try {
        yield call(IntakeDetailsAPI.deleteIntakeNote, id);
        yield put({ type: 'DELETE_INTAKE_NOTE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_INTAKE_NOTE_ERROR', error });
    }
}