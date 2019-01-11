import { put, call } from 'redux-saga/effects';
import MailgunDomainsAPI from '../../api/mailgun-domain/MailgunDomainAPI';

export function* fetchMailgunDomainsSaga() {
    try {
        yield put({ type: 'IS_LOADING' });
        const mailgunDomains = yield call(MailgunDomainsAPI.fetchMailgunDomains);
        yield put({ type: 'FETCH_MAILGUN_DOMAINS_SUCCESS', mailgunDomains });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_MAILGUN_DOMAINS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
