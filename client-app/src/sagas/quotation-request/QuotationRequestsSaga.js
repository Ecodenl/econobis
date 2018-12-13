import { put, call } from 'redux-saga/effects';
import QuotationRequestsAPI from '../../api/quotation-request/QuotationRequestsAPI';

export function* fetchQuotationRequestsSaga({filters, sorts, pagination}) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_QUOTATION_REQUESTS_LOADING' });
        const quotationRequests = yield call(QuotationRequestsAPI.fetchQuotationRequests, {filters, sorts, pagination});
        yield put({ type: 'FETCH_QUOTATION_REQUESTS_SUCCESS', quotationRequests });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_QUOTATION_REQUESTS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}