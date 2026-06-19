export const fetchTeamDetails = id => {
    return {
        type: 'FETCH_TEAM_DETAILS',
        id,
    };
};

export const updateTeam = (team, switchToView) => {
    return {
        type: 'UPDATE_TEAM',
        team,
        switchToView,
    };
};

export const newTeamUser = teamUser => {
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

export const newTeamContactGroup = teamContactGroup => {
    return {
        type: 'NEW_TEAM_CONTACT_GROUP',
        teamContactGroup,
    };
};

export const deleteTeamContactGroup = (teamId, contactGroupId) => {
    return {
        type: 'DELETE_TEAM_CONTACT_GROUP',
        teamId,
        contactGroupId,
    };
};

export const newTeamDistrict = teamDistrict => {
    return {
        type: 'NEW_TEAM_DISTRICT',
        teamDistrict,
    };
};
export const deleteTeamDistrict = (teamId, districtId) => {
    return {
        type: 'DELETE_TEAM_DISTRICT',
        teamId,
        districtId,
    };
};
export const newTeamDocumentCreatedFrom = teamDocumentCreatedFrom => {
    return {
        type: 'NEW_TEAM_DOCUMENT_CREATED_FROM',
        teamDocumentCreatedFrom,
    };
};

export const deleteTeamDocumentCreatedFrom = (teamId, documentCreatedFromId) => {
    return {
        type: 'DELETE_TEAM_DOCUMENT_CREATED_FROM',
        teamId,
        documentCreatedFromId,
    };
};
