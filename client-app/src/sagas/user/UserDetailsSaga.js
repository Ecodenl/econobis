import { put, call, wait } from 'redux-saga/effects';
import UserAPI from '../../api/user/UserAPI';

export function* fetchUserDetailsSaga({ payload }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const userDetails = yield call(UserAPI.fetchUserDetails, payload);
        yield put({ type: 'FETCH_USER_DETAILS_SUCCESS', userDetails });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_USER_DETAILS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

// Update user details and switch to view callback
export function* updateUserDetailsSaga({ user, switchToView }) {
    try {
        const payload = yield call(UserAPI.updateUser, user);
        const userDetails = payload.data.data;

        yield put({ type: 'UPDATE_USER_SUCCESS', userDetails });

        // Reload system data after updating user
        yield put({ type: 'FETCH_SYSTEM_DATA' });
        // Switch back to view callback fn
        yield switchToView();
    } catch (error) {
        yield put({ type: 'UPDATE_USER_DETAILS_ERROR', error });
    }
}
