import { combineReducers } from 'redux';

import ordersListReducer from './OrdersListReducer';
import ordersPaginationReducer from './OrdersPaginationReducer';
import ordersFiltersReducer from './OrdersFiltersReducer';
import ordersSortsReducer from './OrdersSortsReducer';

const ordersReducer = combineReducers({
    list: ordersListReducer,
    filters: ordersFiltersReducer,
    sorts: ordersSortsReducer,
    pagination: ordersPaginationReducer,
});

export default ordersReducer;
