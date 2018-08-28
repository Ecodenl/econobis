import { put, call } from 'redux-saga/effects';
import IntakesAPI from '../../api/intake/IntakesAPI';

export function* fetchIntakesSaga({filters, sorts, pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_INTAKES_LOADING' });
        const intakes = yield call(IntakesAPI.fetchIntakes, {filters, sorts, pagination});
        yield put({ type: 'FETCH_INTAKES_SUCCESS', intakes });
    } catch (error) {
        yield put({ type: 'FETCH_INTAKES_ERROR', error });
    }
}