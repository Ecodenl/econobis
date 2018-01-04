import { put, call } from 'redux-saga/effects';
import MailboxAPI from '../../api/mailbox/MailboxAPI';

export function* fetchMailboxDetailsSaga({ id }) {
    try {
        const mailboxDetails = yield call(MailboxAPI.fetchMailboxDetails, id);
        yield [
            put({ type: 'FETCH_MAILBOX_DETAILS_SUCCESS', mailboxDetails }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_MAILBOX_DETAILS_ERROR', error });
    }
}

export function* deleteMailboxSaga({ id }) {
    try {
        yield call(MailboxAPI.deleteMailbox, id);
        yield put({ type: 'DELETE_MAILBOX_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_MAILBOX_ERROR', error });
    }
}

