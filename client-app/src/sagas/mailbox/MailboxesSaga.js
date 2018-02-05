import { put, call, all } from 'redux-saga/effects';
import MailboxAPI from '../../api/mailbox/MailboxAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchMailboxesSaga() {
    try {
        //yield call(authSaga);
        const mailboxes = yield call(MailboxAPI.fetchMailboxes);

        yield all([
            put({ type: 'FETCH_MAILBOXES_LOADING_SUCCESS'}),
            put({ type: 'FETCH_MAILBOXES_SUCCESS', mailboxes }),
        ]);
    } catch (error) {
        yield put({ type: 'FETCH_MAILBOXES_ERROR', error });
    }
}
