import { delay } from 'redux-saga';
import { put, call, all } from 'redux-saga/effects';

import SystemDataAPI from '../../api/general/SystemDataAPI';

export function* systemDataSaga() {
    for (let i = 0; i < 3; i++) {
        try {
            const systemData = yield call(SystemDataAPI.getSystemData, null);
            yield all([
                put({ type: 'FETCH_SYSTEM_DATA_SUCCESS', systemData }),
                put({ type: 'FETCH_SYSTEM_DATA_LOADED' }),
            ]);
            // if (systemData.data.data.appName) {
            //     document.title = systemData.data.data.appName;
            // }
            return;
        } catch (error) {
            if (i < 2) {
                yield call(delay, 2000);
            } else {
                yield put({ type: 'UNAUTH_USER' });
            }
        }
    }
}
