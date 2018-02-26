import { put, call } from 'redux-saga/effects';
import ProductionProjectDetailsAPI from '../../api/production-project/ProductionProjectDetailsAPI';

export function* fetchProductionProjectSaga({ id }) {
    try {
        const productionProject = yield call(ProductionProjectDetailsAPI.fetchProductionProject, id);

        yield put({ type: 'FETCH_PRODUCTION_PROJECT_SUCCESS', productionProject });
    } catch (error) {
        yield put({ type: 'FETCH_PRODUCTION_PROJECT_ERROR', error });
    }
}