import { put, call } from 'redux-saga/effects';
import ProductionProjectsAPI from '../../api/production-project/ProductionProjectsAPI';

export function* fetchProductionProjectsSaga({ pagination }) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_PRODUCTION_PROJECTS_LOADING' });
        const productionProjects = yield call(ProductionProjectsAPI.fetchProductionProjects, { pagination });
        yield put({ type: 'FETCH_PRODUCTION_PROJECTS_SUCCESS', productionProjects });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_PRODUCTION_PROJECTS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
