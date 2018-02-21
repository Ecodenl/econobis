export default function (state= [], action) {
    switch (action.type) {
        case 'FETCH_TEAM_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.teamDetails.data.data,
            };
        case 'UPDATE_TEAM_DETAILS':
            return {
                ...state,
                ...action.team.data.data,
            };
        case 'NEW_TEAM_USER':
            return {
                ...state,
                users: [
                    ...state.users,
                    {
                        ...action.teamUser,
                    }
                ]
            };
        case 'DELETE_TEAM_USER_SUCCESS':
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.userId),
            };
        default:
            return state;
    }
}