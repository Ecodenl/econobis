import { put, call } from 'redux-saga/effects';
import MeasureAPI from '../../api/measure/MeasureAPI';

export function* fetchMeasureSaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const measure = yield call(MeasureAPI.fetchMeasure, id);
        yield put({ type: 'FETCH_MEASURE_SUCCESS', measure });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_MEASURE_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
