import { put, call } from 'redux-saga/effects';
import ProductsAPI from '../../api/product/ProductsAPI';
import ProductDetailsAPI from '../../api/product/ProductDetailsAPI';
import {hashHistory} from "react-router";

export function* fetchProductsSaga() {
    try {
        yield put({ type: 'IS_LOADING' });
        const products = yield call(ProductsAPI.fetchProducts);
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
        hashHistory.push(`/producten`);
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_PRODUCT_ERROR', error });
    }
}