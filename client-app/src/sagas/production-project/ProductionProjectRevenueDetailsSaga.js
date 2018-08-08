import { put, call } from 'redux-saga/effects';
import ProductionProjectRevenueAPI from "../../api/production-project/ProductionProjectRevenueAPI";

export function* fetchProductionProjectRevenueSaga({ id }) {
    try {
        const productionProjectRevenue = yield call(ProductionProjectRevenueAPI.fetchProductionProjectRevenue, id);

        yield put({ type: 'FETCH_PRODUCTION_PROJECT_REVENUE_SUCCESS', productionProjectRevenue });
    } catch (error) {
        yield put({ type: 'FETCH_PRODUCTION_PROJECT_REVENUE_ERROR', error });
    }
}

export function* fetchProductionProjectRevenueParticipantsSaga(data) {
    try {
        document.body.style.cursor='wait';
        const productionProjectRevenueParticipants = yield call(ProductionProjectRevenueAPI.fetchProductionProjectRevenueParticipants, data.data.id, data.data.page);
        document.body.style.cursor='default';
        yield put({ type: 'PRODUCTION_PROJECT_REVENUE_GET_PARTICIPANTS_SUCCESS', productionProjectRevenueParticipants });
    } catch (error) {
        yield put({ type: 'PRODUCTION_PROJECT_REVENUE_GET_PARTICIPANTS_ERROR', error });
    }
}

export function* fetchProductionProjectRevenueDistributionSaga(data) {
    try {
        document.body.style.cursor='wait';
        const productionProjectRevenueDistribution = yield call(ProductionProjectRevenueAPI.fetchProductionProjectRevenueDistribution, data.data.id, data.data.page);
        document.body.style.cursor='default';
        yield put({ type: 'PRODUCTION_PROJECT_REVENUE_GET_DISTRIBUTION_SUCCESS', productionProjectRevenueDistribution });
    } catch (error) {
        yield put({ type: 'PRODUCTION_PROJECT_REVENUE_GET_DISTRIBUTION_ERROR', error });
    }
}
