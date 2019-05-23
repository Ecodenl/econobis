import { put, call } from 'redux-saga/effects';
import ProjectsAPI from '../../api/project/ProjectsAPI';

export function* fetchProjectsSaga({ pagination }) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_PROJECTS_LOADING' });
        const projects = yield call(ProjectsAPI.fetchProjects, { pagination });
        yield put({ type: 'FETCH_PROJECTS_SUCCESS', projects });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_PROJECTS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
