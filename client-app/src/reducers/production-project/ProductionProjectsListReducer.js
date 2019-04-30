export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_PRODUCTION_PROJECTS_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_PRODUCTION_PROJECTS_SUCCESS':
            return {
                data: action.productionProjects.data.data,
                meta: {
                    total: action.productionProjects.data.meta.total,
                },
                isLoading: false,
            };
        case 'CLEAR_PRODUCTION_PROJECTS':
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
