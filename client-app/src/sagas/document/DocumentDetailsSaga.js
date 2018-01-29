import { put, call } from 'redux-saga/effects';
import DocumentDetailsAPI from "../../api/document/DocumentDetailsAPI";

export function* fetchDocumentDetailsSaga({ id }) {
    try {
        const documentDetails = yield call(DocumentDetailsAPI.fetchDocumentDetails, id);
        yield put({ type: 'FETCH_DOCUMENT_DETAILS_SUCCESS', documentDetails });
    } catch (error) {
        yield put({ type: 'FETCH_DOCUMENT_DETAILS_ERROR', error });
    }
}

export function* deleteDocumentSaga({ id }) {
    try {
        yield call(DocumentDetailsAPI.deleteDocument, id);
        yield put({ type: 'DELETE_DOCUMENT_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_DOCUMENT_ERROR', error });
    }
}
