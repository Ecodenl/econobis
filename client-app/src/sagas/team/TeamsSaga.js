import { put, call } from 'redux-saga/effects';
import TeamsAPI from '../../api/team/TeamsAPI';

export function* fetchTeamsSaga() {
    try {
        const teams = yield call(TeamsAPI.fetchTeams);
        yield put({ type: 'FETCH_TEAMS_SUCCESS', teams });
    } catch (error) {
        yield put({ type: 'FETCH_TEAMS_ERROR', error });
    }
}

export function* deleteTeamSaga({ id }) {
    try {
        yield call(TeamsAPI.deleteTeam, id);
        yield put({ type: 'DELETE_TEAM_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_TEAM_ERROR', error });
    }
}