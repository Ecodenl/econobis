import { combineReducers } from 'redux';

import PaymentInvoicesListReducer from './PaymentInvoicesListReducer';
import PaymentInvoicesPaginationReducer from './PaymentInvoicesPaginationReducer';
import PaymentInvoicesFiltersReducer from './PaymentInvoicesFiltersReducer';
import PaymentInvoicesSortsReducer from './PaymentInvoicesSortsReducer';

const paymentInvoicesReducer = combineReducers({
    list: PaymentInvoicesListReducer,
    filters: PaymentInvoicesFiltersReducer,
    sorts: PaymentInvoicesSortsReducer,
    pagination: PaymentInvoicesPaginationReducer,
});

export default paymentInvoicesReducer;
