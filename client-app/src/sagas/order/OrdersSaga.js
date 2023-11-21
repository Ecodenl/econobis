import { put, call } from 'redux-saga/effects';
import OrdersAPI from '../../api/order/OrdersAPI';
import OrderDetailsAPI from '../../api/order/OrderDetailsAPI';
import { browserHistory } from 'react-router';

export function* fetchOrdersSaga({ filters, sorts, pagination, administrationId, showOrdersWithoutOrderlines }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const orders = yield call(OrdersAPI.fetchOrders, {
            filters,
            sorts,
            pagination,
            administrationId,
            showOrdersWithoutOrderlines,
        });
        yield put({ type: 'FETCH_ORDERS_SUCCESS', orders });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_ORDERS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteOrderSaga({ id }) {
    try {
        yield call(OrderDetailsAPI.deleteOrder, id);
        yield put({ type: 'DELETE_ORDER_SUCCESS', id });
        browserHistory.goBack();
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_ORDER_ERROR', error });
    }
}
