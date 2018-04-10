import { combineReducers } from 'redux';

import OpportunitiesListReducer from './OpportunitiesListReducer';
import OpportunitiesFiltersReducer from './OpportunitiesFiltersReducer';
import OpportunitiesSortsReducer from './OpportunitiesSortsReducer';
import OpportunitiesPaginationReducer from './OpportunitiesPaginationReducer';

const opportunitiesReducer = combineReducers({
    list: OpportunitiesListReducer,
    filters: OpportunitiesFiltersReducer,
    sorts: OpportunitiesSortsReducer,
    pagination: OpportunitiesPaginationReducer,
});

export default opportunitiesReducer;
