import { put, call } from 'redux-saga/effects';
import IntakeDetailsAPI from '../../api/intake/IntakeDetailsAPI';
import { hashHistory } from 'react-router';

export function* fetchIntakeDetailsSaga({ payload }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const intakeDetails = yield call(IntakeDetailsAPI.fetchIntakeDetails, payload);
        yield put({ type: 'FETCH_INTAKE_DETAILS_SUCCESS', intakeDetails });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_INTAKE_DETAILS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteIntakeSaga({ id, contactId }) {
    try {
        yield call(IntakeDetailsAPI.deleteIntake, id);
        yield put({ type: 'DELETE_INTAKE_SUCCESS', id });
        if (contactId == 0) {
            hashHistory.push('/intakes');
        } else {
            hashHistory.push(`/contact/` + contactId);
        }
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_INTAKE_ERROR', error });
    }
}

export function* deleteIntakeMeasureRequestedSaga({ intakeId, measureId }) {
    try {
        yield call(IntakeDetailsAPI.detachMeasureRequested, intakeId, measureId);
        yield put({ type: 'DELETE_INTAKE_MEASURE_REQUESTED_SUCCESS', measureId });
    } catch (error) {
        yield put({ type: 'DELETE_INTAKE_MEASURE_REQUESTED_ERROR', error });
    }
}
