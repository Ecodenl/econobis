import { put, call } from 'redux-saga/effects';
import UserAPI from '../../api/user/UserAPI';

export function* fetchUserDetailsSaga({ payload }) {
    try {
        const userDetails = yield call(UserAPI.fetchUserDetails, payload);
        yield put({ type: 'FETCH_USER_DETAILS_SUCCESS', userDetails });
    } catch (error) {
        yield put({ type: 'FETCH_USER_DETAILS_ERROR', error });
    }
}