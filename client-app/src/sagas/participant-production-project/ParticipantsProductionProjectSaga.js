import { put, call } from 'redux-saga/effects';
import ParticipantsProductionProjectAPI from '../../api/participant-production-project/ParticipantsProductionProjectAPI';

export function* fetchParticipantsProductionProjectSaga({filters, extraFilters,sorts, pagination, filterType}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT_LOADING' });
        const participantsProductionProject = yield call(ParticipantsProductionProjectAPI.fetchParticipantsProductionProject, {filters, extraFilters, sorts, pagination, filterType});
        yield put({ type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT_SUCCESS', participantsProductionProject });
    } catch (error) {
        yield put({ type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT_ERROR', error });
    }
}