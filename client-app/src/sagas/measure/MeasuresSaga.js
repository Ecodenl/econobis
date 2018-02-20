import { put, call } from 'redux-saga/effects';
import MeasureAPI from '../../api/measure/MeasureAPI';

export function* fetchMeasuresSaga() {
    try {
        const measures = yield call(MeasureAPI.fetchMeasureGrid);

        yield put({ type: 'FETCH_MEASURES_SUCCESS', measures });
    } catch (error) {
        yield put({ type: 'FETCH_MEASURES_ERROR', error });
    }
}