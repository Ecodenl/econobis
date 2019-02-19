export default (state = { isLoaded: false, hasError: false }, action) => {
    switch (action.type) {
        case 'FETCH_ME_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.meDetails.data.data,
            };
        case 'FETCH_ME_DETAILS_LOADED':
            return {
                ...state,
                isLoaded: true,
            };
        case 'FETCH_ME_DETAILS_ERROR':
            return {
                ...state,
                hasError: true,
            };
        default:
            return state;
    }
};
