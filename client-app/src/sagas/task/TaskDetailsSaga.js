import { put, call } from 'redux-saga/effects';
import TaskDetailsAPI from '../../api/task/TaskDetailsAPI';

export function* fetchTaskDetailsSaga({ id }) {
    try {
        const taskDetails = yield call(TaskDetailsAPI.fetchTaskDetails, id);
        yield [
            put({ type: 'FETCH_TASK_DETAILS_SUCCESS', taskDetails }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_TASK_DETAILS_ERROR', error });
    }
}

export function* deleteTaskSaga({ id }) {
    try {
        yield call(TaskDetailsAPI.deleteTask, id);
        yield put({ type: 'DELETE_TASK_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_TASK_ERROR', error });
    }
}

