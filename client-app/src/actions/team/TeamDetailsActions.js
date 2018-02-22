export const fetchTeamDetails = (id) => {
    return {
        type: 'FETCH_TEAM_DETAILS',
        id,
    }
};

export const updateTeam = (team, switchToView) => {
    return {
        type: 'UPDATE_TEAM',
        team,
        switchToView,
    }
};

export const newTeamUser = (teamUser) => {
    return {
        type: 'NEW_TEAM_USER',
        teamUser,
    };
};

export const deleteTeamUser = (teamId, userId) => {
    return {
        type: 'DELETE_TEAM_USER',
        teamId,
        userId,
    };
};