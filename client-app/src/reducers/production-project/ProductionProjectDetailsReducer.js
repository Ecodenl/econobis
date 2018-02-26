export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_PRODUCTION_PROJECT_SUCCESS':
            return {
                ...action.productionProject,
            };
        case 'CLEAR_PRODUCTION_PROJECT':
            return state.productionProject = [];
        default:
            return state;
    }
}