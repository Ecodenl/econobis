import { combineReducers } from 'redux';

import registrationsReducer from './RegistrationsReducer';
import registrationsFiltersReducer from './RegistrationsFiltersReducer';
import registrationsSortsReducer from './RegistrationsSortsReducer';
import registrationsPaginationReducer from './RegistrationsPaginationReducer';

const registrationsListReducer = combineReducers({
    list: registrationsReducer,
    filters: registrationsFiltersReducer,
    sorts: registrationsSortsReducer,
    pagination: registrationsPaginationReducer,
});

export default registrationsListReducer;
