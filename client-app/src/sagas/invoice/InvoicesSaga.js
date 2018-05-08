import { put, call } from 'redux-saga/effects';
import InvoicesAPI from '../../api/invoice/InvoicesAPI';

export function* fetchInvoicesSaga({filters,sorts, pagination, administrationId}) {
    try {
        const invoices = yield call(InvoicesAPI.fetchInvoices, {filters, sorts, pagination, administrationId});
        yield put({ type: 'FETCH_INVOICES_SUCCESS', invoices });
    } catch (error) {
        yield put({ type: 'FETCH_INVOICES_ERROR', error });
    }
}