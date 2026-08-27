import { put, call, all } from 'redux-saga/effects';
import EmailTemplateAPI from '../../api/email-template/EmailTemplateAPI';

export function* fetchEmailTemplatesSaga() {
    try {
        yield put({ type: 'IS_LOADING' });
        const emailTemplates = yield call(EmailTemplateAPI.fetchEmailTemplates);
        yield all([
            put({ type: 'FETCH_EMAIL_TEMPLATES_LOADING_SUCCESS' }),
            put({ type: 'FETCH_EMAIL_TEMPLATES_SUCCESS', emailTemplates }),
        ]);
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_EMAIL_TEMPLATES_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* fetchEmailTemplateSaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const emailTemplate = yield call(EmailTemplateAPI.fetchEmailTemplate, id);

        yield put({ type: 'FETCH_EMAIL_TEMPLATE_SUCCESS', emailTemplate });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_EMAIL_TEMPLATE_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteEmailTemplateSaga({ id, callback }) {
    try {
        yield call(EmailTemplateAPI.deleteEmailTemplate, id);
        yield put({ type: 'DELETE_EMAIL_TEMPLATE_SUCCESS', id });
        if (callback) callback(); // 👈 uitvoeren ná succesvolle delete
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_EMAIL_TEMPLATE_ERROR', error });
    }
}
