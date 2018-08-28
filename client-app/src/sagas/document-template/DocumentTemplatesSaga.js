import { put, call, all } from 'redux-saga/effects';
import DocumentTemplateAPI from '../../api/document-template/DocumentTemplateAPI';
import {hashHistory} from "react-router";

export function* fetchDocumentTemplatesSaga() {
    try {
        const documentTemplates = yield call(DocumentTemplateAPI.fetchDocumentTemplates);

        yield all([
            put({ type: 'FETCH_DOCUMENT_TEMPLATES_LOADING_SUCCESS'}),
            put({ type: 'FETCH_DOCUMENT_TEMPLATES_SUCCESS', documentTemplates }),
        ]);
    } catch (error) {
        yield put({ type: 'FETCH_DOCUMENT_TEMPLATES_ERROR', error });
    }
}

export function* fetchDocumentTemplateSaga({ id }) {
    try {
        const documentTemplate = yield call(DocumentTemplateAPI.fetchDocumentTemplate, id);

        yield put({ type: 'FETCH_DOCUMENT_TEMPLATE_SUCCESS', documentTemplate });
    } catch (error) {
        yield put({ type: 'FETCH_DOCUMENT_TEMPLATE_ERROR', error });
    }
}

export function* deleteDocumentTemplateSaga({ id }) {
    try {
        yield call(DocumentTemplateAPI.deleteDocumentTemplate, id);
        yield put({ type: 'DELETE_DOCUMENT_TEMPLATE_SUCCESS', id });
        hashHistory.push(`/document-templates`);
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_DOCUMENT_TEMPLATE_ERROR', error });
    }
}
