export default function (state= [], action) {
    switch (action.type) {
        case 'FETCH_TEAMS_SUCCESS':
            return [
                ...state,
                ...action.teams.data.data
            ];
        case 'CLEAR_TEAMS':
            return state.teams = [];
        case 'DELETE_TEAM_SUCCESS':
            return state.filter((team) => team.id !== action.id);
        default:
            return state;
    }
}