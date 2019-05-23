import { combineReducers } from 'redux';

import ProjectsListReducer from './ProjectsListReducer';
import ProjectsPaginationReducer from './ProjectsPaginationReducer';

const ProjectsReducer = combineReducers({
    list: ProjectsListReducer,
    pagination: ProjectsPaginationReducer,
});

export default ProjectsReducer;
