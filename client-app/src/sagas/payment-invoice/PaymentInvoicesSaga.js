import { put, call } from 'redux-saga/effects';
import PaymentInvoicesAPI from '../../api/payment-invoice/PaymentInvoicesAPI';

export function* fetchPaymentInvoicesSaga({ filters, sorts, pagination, administrationId }) {
    try {
        const paymentInvoices = yield call(PaymentInvoicesAPI.fetchInvoices, {
            filters,
            sorts,
            pagination,
            administrationId,
        });
        yield put({ type: 'FETCH_PAYMENT_INVOICES_SUCCESS', paymentInvoices });
    } catch (error) {
        yield put({ type: 'FETCH_PAYMENT_INVOICES_ERROR', error });
    }
}
