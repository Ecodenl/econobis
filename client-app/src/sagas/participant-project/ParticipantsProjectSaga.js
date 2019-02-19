import { put, call } from 'redux-saga/effects';
import ParticipantsProjectAPI from '../../api/participant-project/ParticipantsProjectAPI';

export function* fetchParticipantsProjectSaga({
    filters,
    extraFilters,
    sorts,
    pagination,
    filterType,
    fetchFromProject,
}) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_PARTICIPANTS_PROJECT_LOADING' });
        const participantsProject = yield call(ParticipantsProjectAPI.fetchParticipantsProject, {
            filters,
            extraFilters,
            sorts,
            pagination,
            filterType,
            fetchFromProject,
        });
        yield put({ type: 'FETCH_PARTICIPANTS_PROJECT_SUCCESS', participantsProject });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_PARTICIPANTS_PROJECT_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
