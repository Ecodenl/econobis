import { put, call } from 'redux-saga/effects';
import TeamDetailsAPI from '../../api/team/TeamDetailsAPI';

export function* fetchTeamDetailsSaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const teamDetails = yield call(TeamDetailsAPI.fetchTeamDetails, id);
        yield put({ type: 'FETCH_TEAM_DETAILS_SUCCESS', teamDetails });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_TEAM_DETAILS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteTeamUserSaga({ teamId, userId }) {
    try {
        yield call(TeamDetailsAPI.deleteTeamUser, { teamId, userId });
        yield put({ type: 'DELETE_TEAM_USER_SUCCESS', userId });
    } catch (error) {
        yield put({ type: 'DELETE_TEAM_USER_ERROR', error });
    }
}

export function* deleteTeamContactGroupSaga({ teamId, contactGroupId }) {
    try {
        yield call(TeamDetailsAPI.deleteTeamContactGroup, { teamId, contactGroupId });
        yield put({ type: 'DELETE_TEAM_CONTACT_GROUP_SUCCESS', contactGroupId });
    } catch (error) {
        yield put({ type: 'DELETE_TEAM_CONTACT_GROUP_ERROR', error });
    }
}

export function* deleteTeamDistrictSaga({ teamId, districtId }) {
    try {
        yield call(TeamDetailsAPI.deleteTeamDistrict, { teamId, districtId });
        yield put({ type: 'DELETE_TEAM_DISTRICT_SUCCESS', districtId });
    } catch (error) {
        yield put({ type: 'DELETE_TEAM_DISTRICT_ERROR', error });
    }
}

export function* deleteTeamDocumentCreatedFromSaga({ teamId, documentCreatedFromId }) {
    try {
        yield call(TeamDetailsAPI.deleteTeamDocumentCreatedFrom, { teamId, documentCreatedFromId });
        yield put({ type: 'DELETE_TEAM_DOCUMENT_CREATED_FROM_SUCCESS', documentCreatedFromId });
    } catch (error) {
        yield put({ type: 'DELETE_TEAM_DOCUMENT_CREATED_FROM_ERROR', error });
    }
}

// Update team details and switch to view callback
export function* updateTeamDetailsSaga({ team, switchToView }) {
    try {
        const payload = yield call(TeamDetailsAPI.updateTeam, team);
        const teamDetails = payload.data.data;

        yield put({ type: 'UPDATE_TEAM_SUCCESS', teamDetails });

        // Reload system data after updating team details
        yield put({ type: 'FETCH_SYSTEM_DATA' });
        // Switch back to view callback fn
        yield switchToView();
    } catch (error) {
        yield put({ type: 'UPDATE_TEAM_DETAILS_ERROR', error });
    }
}
