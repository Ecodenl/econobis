import { combineReducers } from 'redux';

import AddressDonglesListReducer from './AddressDonglesListReducer';
import AddressDonglesFiltersReducer from './AddressDonglesFiltersReducer';
import AddressDonglesSortsReducer from './AddressDonglesSortsReducer';
import AddressDonglesPaginationReducer from './AddressDonglesPaginationReducer';

const addressDonglesReducer = combineReducers({
    list: AddressDonglesListReducer,
    filters: AddressDonglesFiltersReducer,
    sorts: AddressDonglesSortsReducer,
    pagination: AddressDonglesPaginationReducer,
});

export default addressDonglesReducer;
