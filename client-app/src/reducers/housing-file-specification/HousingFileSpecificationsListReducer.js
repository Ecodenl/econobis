export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_HOUSING_FILE_SPECIFICATIONS_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_HOUSING_FILE_SPECIFICATIONS_SUCCESS':
            return {
                data: action.housingFileSpecifications.data.data,
                meta: {
                    total: action.housingFileSpecifications.data.meta.total,
                },
                isLoading: false,
            };
        case 'CLEAR_HOUSING_FILE_SPECIFICATIONS':
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
