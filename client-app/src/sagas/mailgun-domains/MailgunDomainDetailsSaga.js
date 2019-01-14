import {put, call} from 'redux-saga/effects';
import MailgunDomainDetailsAPI from '../../api/mailgun-domain/MailgunDomainDetailsAPI';

export function* fetchMailgunDomainDetailsSaga({id}) {
    try {
        yield put({type: 'IS_LOADING'});
        const mailgunDomainDetails = yield call(MailgunDomainDetailsAPI.fetchMailgunDomainDetails, id);
        yield put({type: 'FETCH_MAILGUN_DOMAIN_DETAILS_SUCCESS', mailgunDomainDetails});
        yield put({type: 'IS_LOADING_COMPLETE'});
    } catch (error) {
        yield put({type: 'FETCH_MAILGUN_DOMAIN_DETAILS_ERROR', error});
        yield put({type: 'LOADING_ERROR', error});
    }
}

// Update mailgunDomain details and switch to view callback
export function* updateMailgunDomainDetailsSaga({mailgunDomain, switchToView}) {
    try {
        const payload = yield call(MailgunDomainDetailsAPI.updateMailgunDomain, mailgunDomain);
        const mailgunDomainDetails = payload.data.data;

        yield put({type: 'UPDATE_MAILGUN_DOMAIN_SUCCESS', mailgunDomainDetails});

        // Switch back to view callback fn
        yield switchToView();
    } catch (error) {
        yield put({type: 'UPDATE_MAILGUN_DOMAIN_DETAILS_ERROR', error});
    }
}
