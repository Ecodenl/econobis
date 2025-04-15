import { put, call } from 'redux-saga/effects';
import ParticipantProjectDetailsAPI from '../../api/participant-project/ParticipantProjectDetailsAPI';
import ParticipantObligationNumberAPI from '../../api/participant-project/ParticipantObligationNumberAPI';
// import { useNavigate } from 'react-router-dom';

export function* fetchParticipantProjectDetailsSaga({ payload }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const participantProjectDetails = yield call(ParticipantProjectDetailsAPI.fetchParticipantProject, payload);
        yield put({
            type: 'FETCH_PARTICIPANT_PROJECT_DETAILS_SUCCESS',
            participantProjectDetails,
        });
        // todo: wm check of dit nog nodig is?
        const projectId = participantProjectDetails.projectId;
        yield put({
            type: 'FETCH_PROJECT',
            id: projectId,
        });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_PARTICIPANT_PROJECT_DETAILS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteParticipantProjectSaga({ id }) {
    try {
        yield call(ParticipantProjectDetailsAPI.deleteParticipantProject, id);
        yield put({ type: 'DELETE_PARTICIPANT_PROJECT_SUCCESS', id });
        // todo WM: verplaatsen
        // this.props.navigate(-1);
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_PARTICIPANT_PROJECT_ERROR', error });
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
