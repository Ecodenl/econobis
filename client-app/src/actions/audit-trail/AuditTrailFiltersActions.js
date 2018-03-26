export const setFilterAuditTrailModel = (model) => ({
    type: 'SET_FILTER_AUDIT_TRAIL_MODEL',
    model,
});

export const setFilterAuditTrailRevisionableId = (revisionableId) => ({
    type: 'SET_FILTER_AUDIT_TRAIL_REVISIONABLE_ID',
    revisionableId,
});

export const setFilterAuditTrailField = (field) => ({
    type: 'SET_FILTER_AUDIT_TRAIL_FIELD',
    field,
});

export const setFilterAuditTrailOldValue = (oldValue) => ({
    type: 'SET_FILTER_AUDIT_TRAIL_OLD_VALUE',
    oldValue,
});

export const setFilterAuditTrailNewValue = (newValue) => ({
    type: 'SET_FILTER_AUDIT_TRAIL_NEW_VALUE',
    newValue,
});

export const setFilterAuditTrailChangedById = (changedById) => ({
    type: 'SET_FILTER_AUDIT_TRAIL_CHANGED_BY_ID',
    changedById,
});

export const setFilterAuditTrailUpdatedAt = (updatedAt) => ({
    type: 'SET_FILTER_AUDIT_TRAIL_UPDATED_AT',
    updatedAt,
});

export const clearFilterAuditTrail = () => ({
    type: 'CLEAR_FILTER_AUDIT_TRAIL',
});
