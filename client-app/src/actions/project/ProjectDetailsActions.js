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

export const fetchRevenuesKwh = id => {
    return {
        type: 'FETCH_REVENUES_KWH',
        id,
    };
};

export const fetchRevenuePartsKwh = id => {
    return {
        type: 'FETCH_REVENUES_KWH_PARTS',
        id,
    };
};

export const previewReport = data => {
    return {
        type: 'PROJECT_REVENUE_PREVIEW_REPORT',
        data,
    };
};

export const previewReportKwh = data => {
    return {
        type: 'REVENUES_KWH_PREVIEW_REPORT',
        data,
    };
};

export const energySupplierExcelReportKwh = data => {
    return {
        type: 'REVENUES_KWH_ENERGY_SUPPLIER_EXCEL_REPORT',
        data,
    };
};

export const previewReportPartsKwh = data => {
    return {
        type: 'REVENUES_KWH_PREVIEW_REPORT_PARTS',
        data,
    };
};

export const getDistribution = data => {
    return {
        type: 'PROJECT_REVENUE_GET_DISTRIBUTION',
        data,
    };
};

export const getDistributionKwh = data => {
    return {
        type: 'REVENUES_KWH_GET_DISTRIBUTION',
        data,
    };
};

export const getDistributionPartsKwh = data => {
    return {
        type: 'REVENUES_KWH_GET_DISTRIBUTION_PARTS',
        data,
    };
};

export const clearPreviewReport = () => {
    return {
        type: 'CLEAR_PROJECT_REVENUE_PREVIEW_REPORT',
    };
};

export const clearPreviewReportKwh = () => {
    return {
        type: 'CLEAR_REVENUES_KWH_PREVIEW_REPORT',
    };
};

export const clearEnergySupplierExcelReportKwh = () => {
    return {
        type: 'CLEAR_REVENUES_KWH_ENERGY_SUPPLIER_EXCEL_REPORT',
    };
};

export const clearPreviewReportPartsKwh = () => {
    return {
        type: 'CLEAR_REVENUES_KWH_PREVIEW_REPORT_PARTS',
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
export const clearRevenuesKwh = () => {
    return {
        type: 'CLEAR_REVENUES_KWH',
    };
};
export const clearRevenuePartsKwh = () => {
    return {
        type: 'CLEAR_REVENUES_KWH_PARTS',
    };
};

export const deleteRevenue = id => {
    return {
        type: 'DELETE_REVENUE',
        id,
    };
};
export const deleteRevenuesKwh = id => {
    return {
        type: 'DELETE_REVENUES_KWH',
        id,
    };
};
export const deleteRevenuePartsKwh = id => {
    return {
        type: 'DELETE_REVENUES_KWH_PARTS',
        id,
    };
};
