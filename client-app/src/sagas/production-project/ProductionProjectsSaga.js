import { put, call } from 'redux-saga/effects';
import ProductionProjectsAPI from '../../api/production-project/ProductionProjectsAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchProductionProjectsSaga({pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_PRODUCTION_PROJECTS_LOADING' });
        const productionProjects = yield call(ProductionProjectsAPI.fetchProductionProjects, {pagination});
        yield put({ type: 'FETCH_PRODUCTION_PROJECTS_SUCCESS', productionProjects });
    } catch (error) {
        yield put({ type: 'FETCH_PRODUCTION_PROJECTS_ERROR', error });
    }
}