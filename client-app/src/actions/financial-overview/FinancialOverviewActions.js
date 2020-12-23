export const previewFinancialOverview = data => {
    return {
        type: 'FINANCIAL_OVERVIEW_PREVIEW_REPORT',
        data,
    };
};

export const clearPreviewFinancialOverview = () => {
    return {
        type: 'CLEAR_FINANCIAL_OVERVIEW_PREVIEW_REPORT',
    };
};
