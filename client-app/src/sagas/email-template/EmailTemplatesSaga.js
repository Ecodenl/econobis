import { put, call, all } from 'redux-saga/effects';
import EmailTemplateAPI from '../../api/email-template/EmailTemplateAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchEmailTemplatesSaga() {
    try {
        yield call(authSaga);
        const emailTemplates = yield call(EmailTemplateAPI.fetchEmailTemplates);
        yield all([
            put({ type: 'FETCH_EMAIL_TEMPLATES_LOADING_SUCCESS'}),
            put({ type: 'FETCH_EMAIL_TEMPLATES_SUCCESS', emailTemplates }),
        ]);
    } catch (error) {
        yield put({ type: 'FETCH_EMAIL_TEMPLATES_ERROR', error });
    }
}

export function* fetchEmailTemplateSaga({ id }) {
    try {
        const emailTemplate = yield call(EmailTemplateAPI.fetchEmailTemplate, id);

        yield put({ type: 'FETCH_EMAIL_TEMPLATE_SUCCESS', emailTemplate });
    } catch (error) {
        yield put({ type: 'FETCH_EMAIL_TEMPLATE_ERROR', error });
    }
}
