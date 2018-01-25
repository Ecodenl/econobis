import { put, call } from 'redux-saga/effects';
import DocumentsAPI from '../../api/document/DocumentsAPI';

export function* fetchDocumentsSaga({pagination}) {
    try {
        yield [
            put({ type: 'FETCH_DOCUMENTS_LOADING' }),
        ];
        const documents = yield call(DocumentsAPI.fetchDocuments, {pagination});
        yield [
            put({ type: 'FETCH_DOCUMENTS_SUCCESS', documents }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_DOCUMENTS_ERROR', error });
    }
}