import { combineReducers } from 'redux';

import registrationsListReducer from './RegistrationsListReducer';
import registrationsFiltersReducer from './RegistrationsFiltersReducer';
import registrationsSortsReducer from './RegistrationsSortsReducer';
import registrationsPaginationReducer from './RegistrationsPaginationReducer';

const registrationsReducer = combineReducers({
    list: registrationsListReducer,
    filters: registrationsFiltersReducer,
    sorts: registrationsSortsReducer,
    pagination: registrationsPaginationReducer,
});

export default registrationsReducer;
