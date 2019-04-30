export const fetchTeams = () => {
    return {
        type: 'FETCH_TEAMS',
    };
};

export const clearTeams = () => {
    return {
        type: 'CLEAR_TEAMS',
    };
};

export const deleteTeam = id => {
    return {
        type: 'DELETE_TEAM',
        id,
    };
};
