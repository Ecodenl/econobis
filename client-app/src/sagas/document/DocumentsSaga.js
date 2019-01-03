import { put, call } from 'redux-saga/effects';
import DocumentsAPI from '../../api/document/DocumentsAPI';

export function* fetchDocumentsSaga({filters, sorts, pagination}) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_DOCUMENTS_LOADING' });
        const documents = yield call(DocumentsAPI.fetchDocuments, {filters, sorts, pagination});
        yield put({ type: 'FETCH_DOCUMENTS_SUCCESS', documents });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_DOCUMENTS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}