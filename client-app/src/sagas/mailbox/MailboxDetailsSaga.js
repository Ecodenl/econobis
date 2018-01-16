import { put, call } from 'redux-saga/effects';
import MailboxAPI from '../../api/mailbox/MailboxAPI';
import AddressAPI from "../../api/contact/AddressAPI";

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

export function* deleteMailboxUserSaga({ mailboxId, userId }) {
    try {
        yield call(MailboxAPI.deleteMailboxUser, { mailboxId, userId });
        yield put({ type: 'DELETE_MAILBOX_USER_SUCCESS', userId });
    } catch (error) {
        yield put({ type: 'DELETE_MAILBOX_USER_ERROR', error });
    }
}
