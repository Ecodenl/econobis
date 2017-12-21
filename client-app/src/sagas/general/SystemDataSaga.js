import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import SystemDataAPI from '../../api/general/SystemDataAPI';

export function* systemDataSaga() {
    for (let i = 0; i < 3; i++) {
        try {
            const systemData = yield call(SystemDataAPI.getSystemData, null);
            yield [
                put({ type: 'FETCH_SYSTEM_DATA_SUCCESS', systemData }),
                put({ type: 'FETCH_SYSTEM_DATA_LOADED' }),
            ];
            return;
        } catch (error) {
            if (i < 2) {
                yield call(delay, 2000);
            } else {
                yield put({ type: 'FETCH_SYSTEM_DATA_ERROR', error });
            }
        }
    }
}
