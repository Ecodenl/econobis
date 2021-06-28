import { combineReducers } from 'redux';

import ProductsListReducer from './ProductsListReducer';
import ProductsFiltersReducer from './ProductsFiltersReducer';

const ProductsReducer = combineReducers({
    list: ProductsListReducer,
    filters: ProductsFiltersReducer,
});

export default ProductsReducer;