import { put, call } from 'redux-saga/effects';
import ProjectDetailsAPI from '../../api/project/ProjectDetailsAPI';
import ProjectValueCourseAPI from '../../api/project/ProjectValueCourseAPI';
import ProjectRevenueAPI from '../../api/project/ProjectRevenueAPI';
import { hashHistory } from 'react-router';

export function* fetchProjectSaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const project = yield call(ProjectDetailsAPI.fetchProject, id);
        yield put({ type: 'FETCH_PROJECT_SUCCESS', project });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_PROJECT_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteValueCourseSaga({ id }) {
    try {
        yield call(ProjectValueCourseAPI.deleteProjectValueCourse, id);
        yield put({ type: 'DELETE_VALUE_COURSE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_VALUE_COURSE_ERROR', error });
    }
}

export function* deleteRevenueSaga({ id }) {
    try {
        yield call(ProjectRevenueAPI.deleteProjectRevenue, id);
        yield put({ type: 'DELETE_REVENUE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_REVENUE_ERROR', error });
    }
}

export function* deleteProjectSaga({ id }) {
    try {
        yield call(ProjectDetailsAPI.deleteProject, id);
        yield put({ type: 'DELETE_PROJECT_SUCCESS', id });
        hashHistory.push(`/projecten`);
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_PROJECT_ERROR', error });
    }
}
