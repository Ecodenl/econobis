import { combineReducers } from 'redux';

import intakesListReducer from './IntakesListReducer';
import intakesFiltersReducer from './IntakesFiltersReducer';
import intakesSortsReducer from './IntakesSortsReducer';
import intakesPaginationReducer from './IntakesPaginationReducer';

const intakesReducer = combineReducers({
    list: intakesListReducer,
    filters: intakesFiltersReducer,
    sorts: intakesSortsReducer,
    pagination: intakesPaginationReducer,
});

export default intakesReducer;
