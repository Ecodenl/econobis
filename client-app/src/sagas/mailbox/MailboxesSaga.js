import { put, call } from 'redux-saga/effects';
import MailboxAPI from '../../api/mailbox/MailboxAPI';

export function* fetchMailboxesSaga() {
    try {
        const mailboxes = yield call(MailboxAPI.fetchMailboxes);

        yield [
            put({ type: 'FETCH_MAILBOXES_LOADING_SUCCESS'}),
            put({ type: 'FETCH_MAILBOXES_SUCCESS', mailboxes }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_MAILBOXES_ERROR', error });
    }
}
