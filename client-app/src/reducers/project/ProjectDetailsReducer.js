export default function(state = [], action) {
    switch (action.type) {
        case 'FETCH_PROJECT_SUCCESS':
            return {
                ...action.project,
            };
        case 'CLEAR_PROJECT':
            return (state.project = []);
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
