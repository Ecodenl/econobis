import { put, call } from 'redux-saga/effects';
import ProductionProjectDetailsAPI from '../../api/production-project/ProductionProjectDetailsAPI';
import ProductionProjectValueCourseAPI from "../../api/production-project/ProductionProjectValueCourseAPI";
import ProductionProjectRevenueAPI from "../../api/production-project/ProductionProjectRevenueAPI";
import {hashHistory} from "react-router";

export function* fetchProductionProjectSaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const productionProject = yield call(ProductionProjectDetailsAPI.fetchProductionProject, id);
        yield put({ type: 'FETCH_PRODUCTION_PROJECT_SUCCESS', productionProject });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_PRODUCTION_PROJECT_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteValueCourseSaga({ id }) {
    try {
        yield call(ProductionProjectValueCourseAPI.deleteProductionProjectValueCourse, id);
        yield put({ type: 'DELETE_VALUE_COURSE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_VALUE_COURSE_ERROR', error });
    }
}

export function* deleteRevenueSaga({ id }) {
    try {
        yield call(ProductionProjectRevenueAPI.deleteProductionProjectRevenue, id);
        yield put({ type: 'DELETE_REVENUE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_REVENUE_ERROR', error });
    }
}

export function* deleteProductionProjectSaga({ id }) {
    try {
        yield call(ProductionProjectDetailsAPI.deleteProductionProject, id);
        yield put({ type: 'DELETE_PRODUCTION_PROJECT_SUCCESS', id });
        hashHistory.push(`/productie-projecten`);
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_PRODUCTION_PROJECT_ERROR', error });
    }
}