import { put, call } from 'redux-saga/effects';
import ParticipantsProductionProjectAPI from '../../api/participant-production-project/ParticipantsProductionProjectAPI';

export function* fetchParticipantsProductionProjectSaga({filters, extraFilters,sorts, pagination, filterType, fetchFromProductionProject}) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT_LOADING' });
        const participantsProductionProject = yield call(ParticipantsProductionProjectAPI.fetchParticipantsProductionProject, {filters, extraFilters, sorts, pagination, filterType, fetchFromProductionProject});
        yield put({ type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT_SUCCESS', participantsProductionProject });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}