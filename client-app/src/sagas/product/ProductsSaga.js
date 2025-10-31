import { put, call } from 'redux-saga/effects';
import ProductsAPI from '../../api/product/ProductsAPI';
import ProductDetailsAPI from '../../api/product/ProductDetailsAPI';

export function* fetchProductsSaga({ filters, filterType }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const products = yield call(ProductsAPI.fetchProducts, {
            filters: filters,
            filterType: filterType,
        });
        yield put({ type: 'FETCH_PRODUCTS_SUCCESS', products });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_PRODUCTS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteProductSaga({ id }) {
    try {
        yield call(ProductDetailsAPI.deleteProduct, id);
        yield put({ type: 'DELETE_PRODUCT_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_PRODUCT_ERROR', error });
    }
}
