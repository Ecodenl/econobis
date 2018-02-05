import { put, call } from 'redux-saga/effects';
import DocumentsAPI from '../../api/document/DocumentsAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchDocumentsSaga({filters, sorts, pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_DOCUMENTS_LOADING' });
        const documents = yield call(DocumentsAPI.fetchDocuments, {filters, sorts, pagination});
        yield put({ type: 'FETCH_DOCUMENTS_SUCCESS', documents });
    } catch (error) {
        yield put({ type: 'FETCH_DOCUMENTS_ERROR', error });
    }
}