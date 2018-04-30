export default function (state= [], action) {
    switch (action.type) {
        case 'FETCH_ADMINISTRATION_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.administrationDetails,
            };
        case 'UPDATE_ADMINISTRATION_SUCCESS':
            return {
                ...state,
                ...action.administrationDetails,
            };
        case 'NEW_ADMINISTRATION_USER':
            return {
                ...state,
                users: [
                    ...state.users,
                    {
                        ...action.administrationUser,
                    }
                ]
            };
        case 'DELETE_ADMINISTRATION_USER_SUCCESS':
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.userId),
            };
        default:
            return state;
    }
}