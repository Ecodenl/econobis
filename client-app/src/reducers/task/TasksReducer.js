import { combineReducers } from 'redux';

import tasksListReducer from './TasksListReducer';
import tasksFiltersReducer from './TasksFiltersReducer';
import tasksSortsReducer from './TasksSortsReducer';
import tasksPaginationReducer from './TasksPaginationReducer';

const tasksReducer = combineReducers({
    list: tasksListReducer,
    filters: tasksFiltersReducer,
    sorts: tasksSortsReducer,
    pagination: tasksPaginationReducer,
});

export default tasksReducer;
