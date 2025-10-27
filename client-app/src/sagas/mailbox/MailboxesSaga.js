import { put, call, all } from 'redux-saga/effects';
import MailboxAPI from '../../api/mailbox/MailboxAPI';

export function* fetchMailboxesSaga({onlyActive}) {
    try {
        yield put({ type: 'IS_LOADING' });
        const mailboxes = yield call(MailboxAPI.fetchMailboxes, {onlyActive});

        yield all([
            put({ type: 'FETCH_MAILBOXES_LOADING_SUCCESS' }),
            put({ type: 'FETCH_MAILBOXES_SUCCESS', mailboxes }),
        ]);
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_MAILBOXES_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
