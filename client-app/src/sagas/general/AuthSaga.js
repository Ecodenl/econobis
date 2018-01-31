import { delay } from 'redux-saga';
import { put, call, all } from 'redux-saga/effects';

import SystemDataAPI from '../../api/general/SystemDataAPI';
import UsersAPI from "../../api/user/UsersAPI";
import AuthAPI from "../../api/general/AuthAPI";

export function* authSaga() {
    try {
        const token = yield call(AuthAPI.refreshToken);
        if(token.error){
            yield put({ type: 'UNAUTH_USER' });
        }
        yield put({ type: 'FETCH_TOKEN_LOADED_SUCCESS', token });
        yield call(delay, 200);
    } catch (error) {
        yield put({ type: 'UNAUTH_USER' });
    }
}
