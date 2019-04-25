import { put, call } from 'redux-saga/effects';
import UsersAPI from '../../api/user/UsersAPI';

export function* fetchUserSaga({ filters, sorts }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const users = yield call(UsersAPI.fetchUsers, { filters, sorts });
        yield put({ type: 'FETCH_USERS_SUCCESS', users });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_USERS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
