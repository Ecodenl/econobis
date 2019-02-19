import { combineReducers } from 'redux';

import ParticipantsProjectListReducer from './ParticipantsProjectListReducer';
import ParticipantsProjectFiltersReducer from './ParticipantsProjectFiltersReducer';
import ParticipantsProjectSortsReducer from './ParticipantsProjectSortsReducer';
import ParticipantsProjectPaginationReducer from './ParticipantsProjectPaginationReducer';

const participantsProjectReducer = combineReducers({
    list: ParticipantsProjectListReducer,
    filters: ParticipantsProjectFiltersReducer,
    sorts: ParticipantsProjectSortsReducer,
    pagination: ParticipantsProjectPaginationReducer,
});

export default participantsProjectReducer;
