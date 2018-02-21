export default function (state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_HOUSING_FILES_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_HOUSING_FILES_SUCCESS':
            return {
                data: action.housingFiles.data.data,
                meta: {
                    total: action.housingFiles.data.meta.total,
                },
                isLoading: false,
            };
        case 'CLEAR_HOUSING_FILES':
            return {
                ...state,
                data: [],
                meta: {},
                isLoading: false,
            };
        default:
            return state;
    }
}
