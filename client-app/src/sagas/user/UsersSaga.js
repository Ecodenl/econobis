import { put, call } from 'redux-saga/effects';
import UsersAPI from '../../api/user/UsersAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchUserSaga({filters, sorts}) {
    try {
        //yield call(authSaga);
        const users = yield call(UsersAPI.fetchUsers, {filters, sorts});
        yield put({ type: 'FETCH_USERS_SUCCESS', users });
    } catch (error) {
        yield put({ type: 'FETCH_USERS_ERROR', error });
    }
}