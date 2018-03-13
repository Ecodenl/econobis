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
