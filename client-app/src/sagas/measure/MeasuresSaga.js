import { put, call } from 'redux-saga/effects';
import MeasureAPI from '../../api/measure/MeasureAPI';

export function* fetchMeasuresSaga() {
    try {
        yield put({ type: 'IS_LOADING' });
        const measures = yield call(MeasureAPI.fetchMeasureGrid);
        yield put({ type: 'FETCH_MEASURES_SUCCESS', measures });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_MEASURES_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
