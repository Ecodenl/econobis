import { combineReducers } from 'redux';

import HousingFilesListReducer from './HousingFilesListReducer';
import HousingFilesFiltersReducer from './HousingFilesFiltersReducer';
import HousingFilesSortsReducer from './HousingFilesSortsReducer';
import HousingFilesPaginationReducer from './HousingFilesPaginationReducer';

const housingFilesReducer = combineReducers({
    list: HousingFilesListReducer,
    filters: HousingFilesFiltersReducer,
    sorts: HousingFilesSortsReducer,
    pagination: HousingFilesPaginationReducer,
});

export default housingFilesReducer;
