export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_PROJECT_SUCCESS':
            return {
                ...action.project,
                deleteSuccess: false,
            };
        case 'CLEAR_PROJECT':
            return (state.project = []);
        case 'DELETE_PROJECT_SUCCESS':
            return {
                ...state,
                deleteSuccess: true,
            };
        case 'RESET_DELETE_PROJECT_SUCCESS':
            return {
                ...state,
                deleteSuccess: false,
            };
        case 'NEW_VALUE_COURSE':
            return {
                ...state,
                valueCourses: action.valueCourse,
            };
        case 'UPDATE_VALUE_COURSE':
            return {
                ...state,
                valueCourses: action.valueCourse,
            };
        case 'DELETE_VALUE_COURSE_SUCCESS':
            return {
                ...state,
                valueCourses: state.valueCourses.filter(valueCourse => valueCourse.id !== action.id),
            };
        case 'DELETE_REVENUE_SUCCESS':
            return {
                ...state,
                revenues: state.revenues.filter(revenue => revenue.id !== action.id),
            };
        default:
            return state;
    }
}
