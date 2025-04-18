export default function(state = [], action) {
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
        case 'ADD_ADMINISTRATION_USER_SUCCESS':
            return {
                ...state,
                users: [
                    ...state.users,
                    {
                        ...action.administrationUserPayload,
                    },
                ],
            };
        case 'DELETE_ADMINISTRATION_USER_SUCCESS':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.userId),
            };
        case 'DELETE_ADMINISTRATION_SEPA_SUCCESS':
            return {
                ...state,
                sepas: state.sepas.filter(sepa => sepa.id !== action.sepaId),
            };
        default:
            return state;
    }
}
