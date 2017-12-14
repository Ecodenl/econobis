import { put, call } from 'redux-saga/effects';
import TaskDetailsAPI from '../api/task/TaskDetailsAPI';

export function* deleteTaskSaga({ id }) {
    try {
        yield call(TaskDetailsAPI.deleteTask, id);
        yield put({ type: 'DELETE_TASK_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_TASK_ERROR', error });
    }
}

