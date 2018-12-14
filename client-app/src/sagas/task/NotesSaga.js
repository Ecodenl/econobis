import { put, call, all } from 'redux-saga/effects';
import TasksAPI from '../../api/task/TasksAPI';

export function* fetchNotesSaga({filters, sorts, pagination}) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_NOTES_LOADING' });
        const notes = yield call(TasksAPI.fetchNotes, {filters, sorts, pagination});
        yield all([
            put({ type: 'FETCH_NOTES_LOADING_SUCCESS'}),
            put({ type: 'FETCH_NOTES_SUCCESS', notes }),
        ]);
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_NOTES_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}