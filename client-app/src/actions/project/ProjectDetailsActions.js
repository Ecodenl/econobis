export const fetchProject = id => {
    return {
        type: 'FETCH_PROJECT',
        id,
    };
};

export const deleteProject = id => {
    return {
        type: 'DELETE_PROJECT',
        id,
    };
};

export const clearProject = () => {
    return {
        type: 'CLEAR_PROJECT',
    };
};

export const newValueCourse = valueCourse => {
    return {
        type: 'NEW_VALUE_COURSE',
        valueCourse,
    };
};

export const updateValueCourse = valueCourse => {
    return {
        type: 'UPDATE_VALUE_COURSE',
        valueCourse,
    };
};

export const deleteValueCourse = id => {
    return {
        type: 'DELETE_VALUE_COURSE',
        id,
    };
};

export const fetchRevenue = id => {
    return {
        type: 'FETCH_PROJECT_REVENUE',
        id,
    };
};

export const previewReport = data => {
    return {
        type: 'PROJECT_REVENUE_PREVIEW_REPORT',
        data,
    };
};

export const getParticipants = data => {
    return {
        type: 'PROJECT_REVENUE_GET_PARTICIPANTS',
        data,
    };
};

export const getDistribution = data => {
    return {
        type: 'PROJECT_REVENUE_GET_DISTRIBUTION',
        data,
    };
};

export const clearPreviewReport = () => {
    return {
        type: 'CLEAR_PROJECT_REVENUE_PREVIEW_REPORT',
    };
};

export const previewParticipantReport = data => {
    return {
        type: 'PROJECT_PARTICIPANT_PREVIEW_REPORT',
        data,
    };
};

export const clearPreviewParticipantReport = () => {
    return {
        type: 'CLEAR_PROJECT_PARTICIPANT_PREVIEW_REPORT',
    };
};

export const clearRevenue = () => {
    return {
        type: 'CLEAR_PROJECT_REVENUE',
    };
};

export const deleteRevenue = id => {
    return {
        type: 'DELETE_REVENUE',
        id,
    };
};
