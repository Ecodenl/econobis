import { combineReducers } from 'redux';

import ParticipantsProductionProjectListReducer from './ParticipantsProductionProjectListReducer';
import ParticipantsProductionProjectFiltersReducer from './ParticipantsProductionProjectFiltersReducer';
import ParticipantsProductionProjectSortsReducer from './ParticipantsProductionProjectSortsReducer';
import ParticipantsProductionProjectPaginationReducer from './ParticipantsProductionProjectPaginationReducer';

const participantsProductionProjectReducer = combineReducers({
    list: ParticipantsProductionProjectListReducer,
    filters: ParticipantsProductionProjectFiltersReducer,
    sorts: ParticipantsProductionProjectSortsReducer,
    pagination: ParticipantsProductionProjectPaginationReducer,
});

export default participantsProductionProjectReducer;
