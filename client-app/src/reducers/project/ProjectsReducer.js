import { combineReducers } from 'redux';

import ProjectsListReducer from './ProjectsListReducer';
import ProjectsPaginationReducer from './ProjectsPaginationReducer';
import ProjectsFiltersReducer from './ProjectsFiltersReducer';
import ProjectsSortsReducer from './ProjectsSortsReducer';

const ProjectsReducer = combineReducers({
    list: ProjectsListReducer,
    filters: ProjectsFiltersReducer,
    sorts: ProjectsSortsReducer,
    pagination: ProjectsPaginationReducer,
});

export default ProjectsReducer;
