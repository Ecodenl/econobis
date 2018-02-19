export const setFilterNoteCreatedAt = (createdAt) => ({
    type: 'SET_FILTER_NOTE_CREATED_AT',
    createdAt,
});

export const setFilterNoteTypeId = (typeId) => ({
    type: 'SET_FILTER_NOTE_TYPE_ID',
    typeId,
});

export const setFilterNoteNote = (note) => ({
    type: 'SET_FILTER_NOTE_NOTE',
    note,
});

export const setFilterNoteContactFullName = (contactFullName) => ({
    type: 'SET_FILTER_NOTE_CONTACT_FULL_NAME',
    contactFullName,
});

export const setFilterNoteDatePlannedStart = (datePlannedStart) => ({
    type: 'SET_FILTER_NOTE_DATE_PLANNED_START',
    datePlannedStart,
});

export const setFilterNoteResponsibleUserName = (responsibleUserName) => ({
    type: 'SET_FILTER_NOTE_RESPONSIBLE_USER_NAME',
    responsibleUserName,
});

export const clearFilterNotes = () => ({
    type: 'CLEAR_FILTER_NOTES',
});
