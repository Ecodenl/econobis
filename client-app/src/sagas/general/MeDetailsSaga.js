import { delay } from 'redux-saga';
import { put, call, all } from 'redux-saga/effects';
import MeAPI from '../../api/general/MeAPI';
import AuthAPI from "../../api/general/AuthAPI";
import {authSaga} from "./AuthSaga";

export function* meDetailsSaga() {
    for (let i = 0; i < 3; i++) {
        try {
            //yield call(authSaga);
            const meDetails = yield call(MeAPI.fetchMeDetails, null);
            yield all([
                put({ type: 'FETCH_ME_DETAILS_SUCCESS', meDetails }),
                put({ type: 'FETCH_ME_DETAILS_LOADED' }),
            ]);
            return;
        } catch (error) {
            if (i < 2) {
                yield call(delay, 2000);
            } else {
                yield put({ type: 'FETCH_ME_DETAILS_ERROR', error });
            }
        }
    }
}
