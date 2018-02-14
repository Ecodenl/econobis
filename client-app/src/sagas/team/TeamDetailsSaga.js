import { put, call } from 'redux-saga/effects';
import TeamDetailsAPI from '../../api/team/TeamDetailsAPI';

export function* fetchTeamDetailsSaga({ id }) {
    try {
        const teamDetails = yield call(TeamDetailsAPI.fetchTeamDetails, id);
        yield put({ type: 'FETCH_TEAM_DETAILS_SUCCESS',teamDetails });
    } catch (error) {
        yield put({ type: 'FETCH_TEAM_DETAILS_ERROR', error });
    }
}

export function* deleteTeamUserSaga({teamId, userId }) {
    try {
        yield call(TeamDetailsAPI.deleteTeamUser, {teamId, userId });
        yield put({ type: 'DELETE_TEAM_USER_SUCCESS', userId });
    } catch (error) {
        yield put({ type: 'DELETE_TEAM_USER_ERROR', error });
    }
}
