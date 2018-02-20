import { put, call } from 'redux-saga/effects';
import MeasureAPI from '../../api/measure/MeasureAPI';

export function* fetchMeasureSaga({ id }) {
    try {
        const measure = yield call(MeasureAPI.fetchMeasure, id);

        yield put({ type: 'FETCH_MEASURE_SUCCESS', measure });
    } catch (error) {
        yield put({ type: 'FETCH_MEASURE_ERROR', error });
    }
}