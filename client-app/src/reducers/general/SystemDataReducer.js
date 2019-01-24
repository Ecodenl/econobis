export default (state = { isLoaded: false, hasError: false }, action) => {
    switch (action.type) {
        case 'FETCH_SYSTEM_DATA_SUCCESS':
            return {
                ...state,
                ...action.systemData.data.data,
            };
        case 'FETCH_SYSTEM_DATA_LOADED':
            return {
                ...state,
                isLoaded: true,
            };
        case 'FETCH_SYSTEM_DATA_ERROR':
            return {
                ...state,
                hasError: true,
            };
        default:
            return state;
    }
};
