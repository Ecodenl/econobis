import { put, call } from 'redux-saga/effects';
import ParticipantProductionProjectDetailsAPI from '../../api/participant-production-project/ParticipantProductionProjectDetailsAPI';

export function* fetchParticipantProductionProjectDetailsSaga({ payload }) {
    try {
        const participantProductionProjectDetails = yield call(ParticipantProductionProjectDetailsAPI.fetchParticipantProductionProject, payload);
        yield put({ type: 'FETCH_PARTICIPANT_PRODUCTION_PROJECT_DETAILS_SUCCESS', participantProductionProjectDetails });
    } catch (error) {
        yield put({ type: 'FETCH_PARTICIPANT_PRODUCTION_PROJECT_DETAILS_ERROR', error });
    }
}

export function* deleteParticipantProductionProjectSaga({ id }) {
    try {
        yield call(ParticipantProductionProjectDetailsAPI.deleteParticipantProductionProject, id);
        yield put({ type: 'DELETE_PARTICIPANT_PRODUCTION_PROJECT_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_PARTICIPANT_PRODUCTION_PROJECT_ERROR', error });
    }
}