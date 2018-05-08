import { combineReducers } from 'redux';

import invoicesListReducer from "./InvoicesListReducer";
import invoicesPaginationReducer from "./InvoicesPaginationReducer";
import invoicesFiltersReducer from "./InvoicesFiltersReducer";
import invoicesSortsReducer from "./InvoicesSortsReducer";

const invoicesReducer = combineReducers({
    list: invoicesListReducer,
    filters: invoicesFiltersReducer,
    sorts: invoicesSortsReducer,
    pagination: invoicesPaginationReducer,
});

export default invoicesReducer;
