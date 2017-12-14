export const setFilterTaskCreatedAt = (createdAt) => ({
    type: 'SET_FILTER_TASK_CREATED_AT',
    createdAt,
});

export const setFilterTaskName = (name) => ({
    type: 'SET_FILTER_TASK_NAME',
    name,
});

export const setFilterTaskContactFullName = (contactFullName) => ({
    type: 'SET_FILTER_TASK_CONTACT_FULL_NAME',
    contactFullName,
});

export const setFilterTaskDatePlanned = (datePlanned) => ({
    type: 'SET_FILTER_TASK_DATE_PLANNED',
    datePlanned,
});

export const setFilterTaskDateStarted = (dateStarted) => ({
    type: 'SET_FILTER_TASK_DATE_STARTED',
    dateStarted,
});

export const setFilterTaskStatusId = (statusId) => ({
    type: 'SET_FILTER_TASK_STATUS_ID',
    statusId,
});

export const setFilterTaskResponsibleUserName = (responsibleUserName) => ({
    type: 'SET_FILTER_TASK_RESPONSIBLE_USER_NAME',
    responsibleUserName,
});
