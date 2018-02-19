import { put, call, all } from 'redux-saga/effects';
import TasksAPI from '../../api/task/TasksAPI';
import TaskDetailsAPI from "../../api/task/TaskDetailsAPI";
import {authSaga} from "../general/AuthSaga";

export function* fetchTasksSaga({filters, sorts, pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_TASKS_LOADING' });
        const tasks = yield call(TasksAPI.fetchTasks, {filters, sorts, pagination});
        yield all([
            put({ type: 'FETCH_TASKS_LOADING_SUCCESS'}),
            put({ type: 'FETCH_TASKS_SUCCESS', tasks }),
        ]);
    } catch (error) {
        yield put({ type: 'FETCH_TASKS_ERROR', error });
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