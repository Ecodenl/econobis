import { put, call } from 'redux-saga/effects';
import ParticipantProductionProjectDetailsAPI from '../../api/participant-production-project/ParticipantProductionProjectDetailsAPI';
import ParticipantTransactionAPI from '../../api/participant-production-project/ParticipantTransactionAPI';
import ParticipantObligationNumberAPI from "../../api/participant-production-project/ParticipantObligationNumberAPI";
import {browserHistory, hashHistory} from "react-router";

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
        browserHistory.goBack();
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_PARTICIPANT_PRODUCTION_PROJECT_ERROR', error });
    }
}

export function* deleteParticipationTransactionSaga({ id }) {
    try {
        yield call(ParticipantTransactionAPI.deleteParticipantTransaction, id);
        yield put({ type: 'DELETE_PARTICIPATION_TRANSACTION_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_PARTICIPATION_TRANSACTION_ERROR', error });
    }
}

export function* deleteObligationNumberSaga({ id }) {
    try {
        yield call(ParticipantObligationNumberAPI.deleteObligationNumber, id);
        yield put({ type: 'DELETE_OBLIGATION_NUMBER_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_OBLIGATION_NUMBER_ERROR', error });
    }
}