import { put, call } from 'redux-saga/effects';
import QuotationRequestsAPI from '../../api/quotation-request/QuotationRequestsAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchQuotationRequestsSaga({filters, sorts, pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_QUOTATION_REQUESTS_LOADING' });
        const quotationRequests = yield call(QuotationRequestsAPI.fetchQuotationRequests, {filters, sorts, pagination});
        yield put({ type: 'FETCH_QUOTATION_REQUESTS_SUCCESS', quotationRequests });
    } catch (error) {
        yield put({ type: 'FETCH_QUOTATION_REQUESTS_ERROR', error });
    }
}