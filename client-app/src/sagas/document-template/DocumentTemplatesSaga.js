import { put, call, all } from 'redux-saga/effects';
import DocumentTemplateAPI from '../../api/document-template/DocumentTemplateAPI';

export function* fetchDocumentTemplatesSaga() {
    try {
        yield put({ type: 'IS_LOADING' });
        const documentTemplates = yield call(DocumentTemplateAPI.fetchDocumentTemplates);
        yield all([
            put({ type: 'FETCH_DOCUMENT_TEMPLATES_LOADING_SUCCESS' }),
            put({ type: 'FETCH_DOCUMENT_TEMPLATES_SUCCESS', documentTemplates }),
        ]);
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_DOCUMENT_TEMPLATES_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* fetchDocumentTemplateSaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const documentTemplate = yield call(DocumentTemplateAPI.fetchDocumentTemplate, id);

        yield put({ type: 'FETCH_DOCUMENT_TEMPLATE_SUCCESS', documentTemplate });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_DOCUMENT_TEMPLATE_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteDocumentTemplateSaga({ id, callback }) {
    try {
        yield call(DocumentTemplateAPI.deleteDocumentTemplate, id);
        yield put({ type: 'DELETE_DOCUMENT_TEMPLATE_SUCCESS', id });
        if (callback) callback(); // 👈 uitvoeren ná succesvolle delete
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_DOCUMENT_TEMPLATE_ERROR', error });
    }
}
