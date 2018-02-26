export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_PRODUCTION_PROJECT_SUCCESS':
            return {
                ...action.productionProject,
            };
        case 'CLEAR_PRODUCTION_PROJECT':
            return state.productionProject = [];
        case 'NEW_VALUE_COURSE':
            return {
                ...state,
                valueCourses: action.valueCourse
            };
        case 'UPDATE_VALUE_COURSE':
            return {
                ...state,
                valueCourses: action.valueCourse
            };
        case 'DELETE_VALUE_COURSE_SUCCESS':
            return {
                ...state,
                valueCourses: state.valueCourses.filter((valueCourse) => valueCourse.id !== action.id),
            };
        default:
            return state;
    }
}