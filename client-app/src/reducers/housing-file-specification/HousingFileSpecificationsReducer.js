import { combineReducers } from 'redux';

import HousingFileSpecificationsListReducer from './HousingFileSpecificationsListReducer';
import HousingFileSpecificationsFiltersReducer from './HousingFileSpecificationsFiltersReducer';
import HousingFileSpecificationsSortsReducer from './HousingFileSpecificationsSortsReducer';
import HousingFileSpecificationsPaginationReducer from './HousingFileSpecificationsPaginationReducer';

const housingFileSpecificationsReducer = combineReducers({
    list: HousingFileSpecificationsListReducer,
    filters: HousingFileSpecificationsFiltersReducer,
    sorts: HousingFileSpecificationsSortsReducer,
    pagination: HousingFileSpecificationsPaginationReducer,
});

export default housingFileSpecificationsReducer;
