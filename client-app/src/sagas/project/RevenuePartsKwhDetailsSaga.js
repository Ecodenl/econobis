import { put, call } from 'redux-saga/effects';
import RevenuePartsKwhAPI from '../../api/project/RevenuePartsKwhAPI';

export function* fetchRevenuePartsKwhSaga({ id }) {
    try {
        const revenuePartsKwh = yield call(RevenuePartsKwhAPI.fetchRevenuePartsKwh, id);

        yield put({ type: 'FETCH_REVENUE_PARTS_KWH_SUCCESS', revenuePartsKwh });
    } catch (error) {
        yield put({ type: 'FETCH_REVENUE_PARTS_KWH_ERROR', error });
    }
}

export function* fetchRevenueDistributionPartsKwhSaga(data) {
    try {
        document.body.style.cursor = 'wait';
        const revenueDistributionPartsKwh = yield call(
            RevenuePartsKwhAPI.fetchRevenueDistributionPartsKwh,
            data.data.id,
            data.data.page
        );
        document.body.style.cursor = 'default';
        yield put({
            type: 'REVENUES_KWH_GET_DISTRIBUTION_PARTS_SUCCESS',
            revenueDistributionPartsKwh,
        });
    } catch (error) {
        document.body.style.cursor = 'default';
        yield put({ type: 'REVENUES_KWH_GET_DISTRIBUTION_PARTS_ERROR', error });
    }
}
