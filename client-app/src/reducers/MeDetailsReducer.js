export default function (state= {}, action) {
    switch(action.type) {
        case 'FETCH_ME_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.meDetails,
            };
        default:
            return state;
    }
}