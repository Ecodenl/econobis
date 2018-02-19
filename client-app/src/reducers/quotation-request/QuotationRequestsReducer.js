import { combineReducers } from 'redux';

import QuotationRequestsListReducer from './QuotationRequestsListReducer';
import QuotationRequestsFiltersReducer from './QuotationRequestsFiltersReducer';
import QuotationRequestsSortsReducer from './QuotationRequestsSortsReducer';
import QuotationRequestsPaginationReducer from './QuotationRequestsPaginationReducer';

const quotationRequestsReducer = combineReducers({
    list: QuotationRequestsListReducer,
    filters: QuotationRequestsFiltersReducer,
    sorts: QuotationRequestsSortsReducer,
    pagination: QuotationRequestsPaginationReducer,
});

export default quotationRequestsReducer;
