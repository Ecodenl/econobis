import { put, call } from 'redux-saga/effects';
import ProductionProjectDetailsAPI from '../../api/production-project/ProductionProjectDetailsAPI';
import ProductionProjectValueCourseAPI from "../../api/production-project/ProductionProjectValueCourseAPI";

export function* fetchProductionProjectSaga({ id }) {
    try {
        const productionProject = yield call(ProductionProjectDetailsAPI.fetchProductionProject, id);

        yield put({ type: 'FETCH_PRODUCTION_PROJECT_SUCCESS', productionProject });
    } catch (error) {
        yield put({ type: 'FETCH_PRODUCTION_PROJECT_ERROR', error });
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