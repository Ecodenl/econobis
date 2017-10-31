export default function (state= {}, action) {
    switch(action.type) {
        case 'FETCH_USER_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.userDetails,
            };
        default:
            return state;
    }
}