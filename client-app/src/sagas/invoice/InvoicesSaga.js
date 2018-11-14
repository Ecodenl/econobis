import { put, call } from 'redux-saga/effects';
import InvoicesAPI from '../../api/invoice/InvoicesAPI';
import InvoiceDetailsAPI from "../../api/invoice/InvoiceDetailsAPI";

export function* fetchInvoicesSaga({filters,sorts, pagination, administrationId}) {
    try {
        const invoices = yield call(InvoicesAPI.fetchInvoices, {filters, sorts, pagination, administrationId});
        yield put({ type: 'FETCH_INVOICES_SUCCESS', invoices });
    } catch (error) {
        yield put({ type: 'FETCH_INVOICES_ERROR', error });
    }
}

export function* deleteInvoiceFromGridSaga({ id }) {
    try {
        yield call(InvoiceDetailsAPI.deleteInvoice, id);
        yield put({ type: 'DELETE_INVOICE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_INVOICE_ERROR', error });
    }
}