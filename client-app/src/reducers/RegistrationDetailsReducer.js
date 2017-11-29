export default function (state= {}, action) {
    switch(action.type) {
        case 'FETCH_REGISTRATION_DETAILS_SUCCESS':
            return {
                ...state,
                ...action.registrationDetails,
            };
        case 'UPDATE_REGISTRATION':
            return {
                ...state,
                ...action.registrationDetails,
            };
        case 'NEW_REGISTRATION_NOTE':
            return {
                ...state,
                notes: [
                    ...state.notes,
                    {
                        ...action.note,
                    }
                ]
            };
        case 'UPDATE_REGISTRATION_NOTE':
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.note.id ?
                        {
                            ...note,
                            note: action.note.note,
                        }
                        :
                        note,
                )
            };
        case 'DELETE_REGISTRATION_NOTE_SUCCESS':
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.id),
            };
        default:
            return state;
    }
}