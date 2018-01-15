import { combineReducers } from 'redux';

import tasksReducer from './TasksReducer';
import tasksFiltersReducer from './TasksFiltersReducer';
import tasksSortsReducer from './TasksSortsReducer';
import tasksPaginationReducer from './TasksPaginationReducer';

const tasksListReducer = combineReducers({
    list: tasksReducer,
    filters: tasksFiltersReducer,
    sorts: tasksSortsReducer,
    pagination: tasksPaginationReducer,
});

export default tasksListReducer;
