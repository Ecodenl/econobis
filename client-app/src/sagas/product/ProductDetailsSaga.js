import { put, call } from 'redux-saga/effects';
import ProductDetailsAPI from '../../api/product/ProductDetailsAPI';

export function* fetchProductDetailsSaga({ id }) {
    try {
        const productDetails = yield call(ProductDetailsAPI.fetchProductDetails, id);
        yield put({ type: 'FETCH_PRODUCT_DETAILS_SUCCESS',productDetails });
    } catch (error) {
        yield put({ type: 'FETCH_PRODUCT_DETAILS_ERROR', error });
    }
}

export function* updateProductDetailsSaga({ product, switchToView }) {
    try {
        const payload = yield call(ProductDetailsAPI.updateProduct, {product});
        const productDetails = payload.data.data;

        yield put({ type: 'UPDATE_PRODUCT_SUCCESS', productDetails });

        yield switchToView();
    } catch (error) {
        yield put({ type: 'UPDATE_PRODUCT_DETAILS_ERROR', error });
    }
}

export function* addProductPriceHistorySaga({ priceHistory }) {
    try {
        const payload = yield call(ProductDetailsAPI.newPriceHistory, priceHistory);

        const priceHistoryPayload = payload.data.data;

        yield put({ type: 'ADD_PRODUCT_PRICE_HISTORY_SUCCESS', priceHistoryPayload });
    } catch (error) {
        yield put({ type: 'ADD_PRODUCT_PRICE_HISTORY_ERROR', error });
    }
}