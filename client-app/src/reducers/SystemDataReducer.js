export default (state = {isLoaded: false}, action) => {
    switch(action.type) {
        case 'FETCH_SYSTEM_DATA_SUCCESS':
            return {
                ...state,
                ...action.systemData,
            };
        case 'FETCH_SYSTEM_DATA_LOADED':
            return {
                ...state,
                isLoaded: true,

            };
        default:
            return state;
    }
}