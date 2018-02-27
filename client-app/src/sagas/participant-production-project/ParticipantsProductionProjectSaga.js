import { put, call } from 'redux-saga/effects';
import ParticipantsProductionProjectAPI from '../../api/participant-production-project/ParticipantsProductionProjectAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchParticipantsProductionProjectSaga({filters, sorts, pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT_LOADING' });
        const participantsProductionProject = yield call(ParticipantsProductionProjectAPI.fetchParticipantsProductionProject, {filters, sorts, pagination});
        yield put({ type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT_SUCCESS', participantsProductionProject });
    } catch (error) {
        yield put({ type: 'FETCH_PARTICIPANTS_PRODUCTION_PROJECT_ERROR', error });
    }
}