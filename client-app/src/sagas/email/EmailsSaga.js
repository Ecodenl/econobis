import { put, call, all } from 'redux-saga/effects';
import EmailAPI from '../../api/email/EmailAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchEmailsSaga({ folder, pagination }) {
    try {
        yield call(authSaga);
        const emails = yield call(EmailAPI.fetchEmails, {folder, pagination});
        yield all([
            put({ type: 'FETCH_EMAILS_LOADING_SUCCESS'}),
            put({ type: 'FETCH_EMAILS_SUCCESS', emails }),
        ]);
    } catch (error) {
        yield put({ type: 'FETCH_EMAILS_ERROR', error });
    }
}

export function* fetchEmailSaga({ id }) {
    try {
        const email = yield call(EmailAPI.fetchEmail, id);

        yield put({ type: 'FETCH_EMAIL_SUCCESS', email });
    } catch (error) {
        yield put({ type: 'FETCH_EMAIL_ERROR', error });
    }
}
