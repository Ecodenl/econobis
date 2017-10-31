import { put, call } from 'redux-saga/effects';
import SystemDataAPI from '../api/SystemDataAPI';

export function* systemDataSaga() {
    try {
        const systemData = yield call(SystemDataAPI.getSystemData, null);
        yield [
            put({ type: 'FETCH_SYSTEM_DATA_SUCCESS', systemData }),
            put({ type: 'FETCH_SYSTEM_DATA_LOADED' }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_SYSTEM_DATA_ERROR', error });
    }
}