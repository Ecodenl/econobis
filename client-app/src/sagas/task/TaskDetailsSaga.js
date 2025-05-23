import { put, call } from 'redux-saga/effects';
import TaskDetailsAPI from '../../api/task/TaskDetailsAPI';

export function* fetchTaskDetailsSaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const taskDetails = yield call(TaskDetailsAPI.fetchTaskDetails, id);
        yield put({ type: 'FETCH_TASK_DETAILS_SUCCESS', taskDetails });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_TASK_DETAILS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteTaskSaga({ id }) {
    try {
        yield call(TaskDetailsAPI.deleteTask, id);
        yield put({ type: 'DELETE_TASK_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_TASK_ERROR', error });
    }
}
