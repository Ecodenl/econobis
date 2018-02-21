export const setFilterTaskCreatedAt = (createdAt) => ({
    type: 'SET_FILTER_TASK_CREATED_AT',
    createdAt,
});

export const setFilterTaskTypeId = (typeId) => ({
    type: 'SET_FILTER_TASK_TYPE_ID',
    typeId,
});

export const setFilterTaskNote = (note) => ({
    type: 'SET_FILTER_TASK_NOTE',
    note,
});

export const setFilterTaskContactFullName = (contactFullName) => ({
    type: 'SET_FILTER_TASK_CONTACT_FULL_NAME',
    contactFullName,
});

export const setFilterTaskDatePlannedStart = (datePlannedStart) => ({
    type: 'SET_FILTER_TASK_DATE_PLANNED_START',
    datePlannedStart,
});

export const setFilterTaskResponsibleName = (responsibleName) => ({
    type: 'SET_FILTER_TASK_RESPONSIBLE_NAME',
    responsibleName,
});

export const clearFilterTask = () => ({
    type: 'CLEAR_FILTER_TASKS',
});
