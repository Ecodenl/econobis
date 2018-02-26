import { combineReducers } from 'redux';

import ProductionProjectsListReducer from './ProductionProjectsListReducer';
import ProductionProjectsPaginationReducer from './ProductionProjectsPaginationReducer';

const ProductionProjectsReducer = combineReducers({
    list: ProductionProjectsListReducer,
    pagination: ProductionProjectsPaginationReducer,
});

export default ProductionProjectsReducer;
