import { put, call } from 'redux-saga/effects';
import UserAPI from '../api/UserAPI';

export function* userDetailsSaga() {
    try {
        const userDetails = yield call(UserAPI.fetchUserDetails, null);
        yield [
            put({ type: 'FETCH_USER_DETAILS_SUCCESS', userDetails }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_USER_DETAILS_ERROR', error });
    }
}