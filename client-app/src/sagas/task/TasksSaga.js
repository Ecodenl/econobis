import { put, call, all } from 'redux-saga/effects';
import TasksAPI from '../../api/task/TasksAPI';
import TaskDetailsAPI from "../../api/task/TaskDetailsAPI";

export function* fetchTasksSaga({filters, sorts, pagination}) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_TASKS_LOADING' });
        const tasks = yield call(TasksAPI.fetchTasks, {filters, sorts, pagination});
        yield all([
            put({ type: 'FETCH_TASKS_LOADING_SUCCESS'}),
            put({ type: 'FETCH_TASKS_SUCCESS', tasks }),
        ]);
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_TASKS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* setTaskFinishedSaga({ task }) {
    try {
        task = yield call(TaskDetailsAPI.updateTask, task);
        const id = task.data.data.id;
        yield put({ type: 'SET_TASK_FINISHED_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'SET_TASK_FINISHED_ERROR', error });
    }
}