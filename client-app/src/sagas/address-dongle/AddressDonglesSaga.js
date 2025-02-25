import { put, call } from 'redux-saga/effects';
import AddressDongleAPI from '../../api/address-dongle/AddressDongleAPI';

export function* fetchAddressDonglesSaga({ filters, sorts, pagination }) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_ADDRESS_DONGLES_LOADING' });
        const addressDongles = yield call(AddressDongleAPI.fetchAddressDongles, {
            filters,
            sorts,
            pagination,
        });
        yield put({ type: 'FETCH_ADDRESS_DONGLES_SUCCESS', addressDongles });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_ADDRESS_DONGLES_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
