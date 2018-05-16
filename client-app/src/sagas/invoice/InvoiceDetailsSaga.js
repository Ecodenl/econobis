import { put, call } from 'redux-saga/effects';
import InvoiceDetailsAPI from '../../api/invoice/InvoiceDetailsAPI';

export function* fetchInvoiceDetailsSaga({ id }) {
    try {
        const invoiceDetails = yield call(InvoiceDetailsAPI.fetchInvoiceDetails, id);
        yield put({ type: 'FETCH_INVOICE_DETAILS_SUCCESS',invoiceDetails });
    } catch (error) {
        yield put({ type: 'FETCH_INVOICE_DETAILS_ERROR', error });
    }
}