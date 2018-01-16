import { combineReducers } from 'redux';

import opportunitiesListReducer from './OpportunitiesListReducer';
import opportunitiesPaginationReducer from './OpportunitiesPaginationReducer';

const opportunitiesReducer = combineReducers({
    list: opportunitiesListReducer,
    pagination: opportunitiesPaginationReducer,
});

export default opportunitiesReducer;
