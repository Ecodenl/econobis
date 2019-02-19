export default function(state = {}, action) {
    switch (action.type) {
        case 'FETCH_USER_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.userDetails,
            };
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                ...action.userDetails,
            };
        case 'UPDATE_ROLE':
            return {
                ...state,
                roles: [
                    ...state.roles.map(role => {
                        if (role.id == action.id) {
                            role.hasRole = action.value;
                            return role;
                        } else {
                            return role;
                        }
                    }),
                ],
            };
        default:
            return state;
    }
}
