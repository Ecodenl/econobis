export const fetchTeamDetails = (id) => {
    return {
        type: 'FETCH_TEAM_DETAILS',
        id,
    }
};

export const updateTeam = (team) => {
    return {
        type: 'UPDATE_TEAM_DETAILS',
        team,
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