import { put, call } from 'redux-saga/effects';
import ProductsAPI from '../../api/product/ProductsAPI';
import ProductDetailsAPI from '../../api/product/ProductDetailsAPI';

export function* fetchProductsSaga() {
    try {
        const products = yield call(ProductsAPI.fetchProducts);
        yield put({ type: 'FETCH_PRODUCTS_SUCCESS', products });
    } catch (error) {
        yield put({ type: 'FETCH_PRODUCTS_ERROR', error });
    }
}

export function* deleteProductSaga({ id }) {
    try {
        yield call(ProductDetailsAPI.deleteProduct, id);
        yield put({ type: 'DELETE_PRODUCT_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_PRODUCT_ERROR', error });
    }
}