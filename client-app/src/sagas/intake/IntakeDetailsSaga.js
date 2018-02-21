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
        yield put({ type: 'DELETE_INTAKE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_INTAKE_ERROR', error });
    }
}

export function* deleteIntakeMeasureRequestedSaga({ intakeId, measureId }) {
    try {
        yield call(IntakeDetailsAPI.detachMeasureRequested, intakeId, measureId);
        yield put({ type: 'DELETE_INTAKE_MEASURE_REQUESTED_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_INTAKE_MEASURE_REQUESTED_ERROR', error });
    }
}