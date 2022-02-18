import { put, call } from 'redux-saga/effects';
import RevenuesKwhAPI from '../../api/project/RevenuesKwhAPI';

export function* fetchRevenuesKwhSaga({ id }) {
    try {
        const revenuesKwh = yield call(RevenuesKwhAPI.fetchRevenuesKwh, id);

        yield put({ type: 'FETCH_REVENUES_KWH_SUCCESS', revenuesKwh });
    } catch (error) {
        yield put({ type: 'FETCH_REVENUES_KWH_ERROR', error });
    }
}

export function* fetchRevenueDistributionKwhSaga(data) {
    try {
        document.body.style.cursor = 'wait';
        const revenueDistributionKwh = yield call(
            RevenuesKwhAPI.fetchRevenueDistributionKwh,
            data.data.id,
            data.data.page
        );
        document.body.style.cursor = 'default';
        yield put({
            type: 'REVENUES_KWH_GET_DISTRIBUTION_SUCCESS',
            revenueDistributionKwh,
        });
    } catch (error) {
        document.body.style.cursor = 'default';
        yield put({ type: 'REVENUES_KWH_GET_DISTRIBUTION_ERROR', error });
    }
}
