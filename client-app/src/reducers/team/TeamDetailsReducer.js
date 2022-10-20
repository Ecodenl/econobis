export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_TEAM_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.teamDetails.data.data,
            };
        case 'UPDATE_TEAM_SUCCESS':
            return {
                ...state,
                ...action.teamDetails,
            };
        case 'NEW_TEAM_USER':
            return {
                ...state,
                users: [
                    ...state.users,
                    {
                        ...action.teamUser,
                    },
                ],
            };
        case 'DELETE_TEAM_USER_SUCCESS':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.userId),
            };
        case 'NEW_TEAM_CONTACT_GROUP':
            return {
                ...state,
                contactGroups: [
                    ...state.contactGroups,
                    {
                        ...action.teamContactGroup,
                    },
                ],
            };
        case 'DELETE_TEAM_CONTACT_GROUP_SUCCESS':
            return {
                ...state,
                contactGroups: state.contactGroups.filter(contactGroup => contactGroup.id !== action.contactGroupId),
            };
        default:
            return state;
    }
}
