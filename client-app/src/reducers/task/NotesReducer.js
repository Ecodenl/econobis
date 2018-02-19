import { combineReducers } from 'redux';

import notesListReducer from './NotesListReducer';
import notesFiltersReducer from './NotesFiltersReducer';
import notesSortsReducer from './NotesSortsReducer';
import notesPaginationReducer from './NotesPaginationReducer';

const notesReducer = combineReducers({
    list: notesListReducer,
    filters: notesFiltersReducer,
    sorts: notesSortsReducer,
    pagination: notesPaginationReducer,
});

export default notesReducer;
