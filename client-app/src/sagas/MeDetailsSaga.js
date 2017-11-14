import { put, call } from 'redux-saga/effects';
import MeAPI from '../api/MeAPI';

export function* meDetailsSaga() {
    try {
        const meDetails = yield call(MeAPI.fetchMeDetails, null);
        yield [
            put({ type: 'FETCH_ME_DETAILS_SUCCESS', meDetails }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_ME_DETAILS_ERROR', error });
    }
}