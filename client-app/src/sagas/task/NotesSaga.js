import { put, call, all } from 'redux-saga/effects';
import TasksAPI from '../../api/task/TasksAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchNotesSaga({filters, sorts, pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_NOTES_LOADING' });
        const notes = yield call(TasksAPI.fetchNotes, {filters, sorts, pagination});
        yield all([
            put({ type: 'FETCH_NOTES_LOADING_SUCCESS'}),
            put({ type: 'FETCH_NOTES_SUCCESS', notes }),
        ]);
    } catch (error) {
        yield put({ type: 'FETCH_NOTES_ERROR', error });
    }
}