export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_NOTES_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_NOTES_SUCCESS':
            return {
                data: action.notes.data.data,
                meta: {
                    total: action.notes.data.meta.total,
                    noteIdsTotal: action.notes.data.meta.noteIdsTotal,
                },
                isLoading: false,
            };
        case 'CLEAR_NOTES':
            return {
                ...state,
                data: [],
                meta: {},
                isLoading: false,
            };
        case 'DELETE_NOTE_SUCCESS':
            return {
                ...state,
                data: state.data.filter(note => note.id !== action.id),
            };
        default:
            return state;
    }
}
