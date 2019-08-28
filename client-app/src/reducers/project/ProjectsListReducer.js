export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_PROJECTS_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_PROJECTS_SUCCESS':
            return {
                data: action.projects.data.data,
                meta: {
                    total: action.projects.data.meta.total,
                },
                isLoading: false,
            };
        case 'CLEAR_PROJECTS':
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
