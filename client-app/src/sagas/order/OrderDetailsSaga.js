import { put, call } from 'redux-saga/effects';
import OrderDetailsAPI from '../../api/order/OrderDetailsAPI';

export function* fetchOrderDetailsSaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const orderDetails = yield call(OrderDetailsAPI.fetchOrderDetails, id);
        yield put({ type: 'FETCH_ORDER_DETAILS_SUCCESS', orderDetails });
        // Reload system data
        yield put({ type: 'FETCH_SYSTEM_DATA' });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_ORDER_DETAILS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* updateOrderDetailsSaga({ order, switchToView }) {
    try {
        const payload = yield call(OrderDetailsAPI.updateOrder, { order });
        const orderDetails = payload.data.data;

        yield put({ type: 'UPDATE_ORDER_SUCCESS', orderDetails });
        // Reload system data
        yield put({ type: 'FETCH_SYSTEM_DATA' });
        yield switchToView();
    } catch (error) {
        yield put({ type: 'UPDATE_ORDER_DETAILS_ERROR', error });
    }
}
