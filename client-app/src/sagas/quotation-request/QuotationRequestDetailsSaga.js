import { put, call } from 'redux-saga/effects';
import QuotationRequestDetailsAPI from '../../api/quotation-request/QuotationRequestDetailsAPI';

export function* fetchQuotationRequestDetailsSaga({ payload }) {
    try {
        const quotationRequestDetails = yield call(QuotationRequestDetailsAPI.fetchQuotationRequestDetails, payload);
        yield put({ type: 'FETCH_QUOTATION_REQUEST_DETAILS_SUCCESS', quotationRequestDetails });
    } catch (error) {
        yield put({ type: 'FETCH_QUOTATION_REQUEST_DETAILS_ERROR', error });
    }
}

export function* deleteQuotationRequestSaga({ id }) {
    try {
        yield call(QuotationRequestDetailsAPI.deleteQuotationRequest, id);
        yield put({ type: 'DELETE_QUOTATION_REQUEST_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_QUOTATION_REQUEST_ERROR', error });
    }
}