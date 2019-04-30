export const fetchAuditTrail = (filters, sorts, pagination) => {
    return {
        type: 'FETCH_AUDIT_TRAIL',
        filters,
        sorts,
        pagination,
    };
};

export const clearAuditTrail = () => {
    return {
        type: 'CLEAR_AUDIT_TRAIL',
    };
};
