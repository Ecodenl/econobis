import { combineReducers } from 'redux';

import auditTrailListReducer from './AuditTrailListReducer';
import auditTrailFiltersReducer from './AuditTrailFiltersReducer';
import auditTrailSortsReducer from './AuditTrailSortsReducer';
import auditTrailPaginationReducer from './AuditTrailPaginationReducer';

const auditTrailReducer = combineReducers({
    list: auditTrailListReducer,
    filters: auditTrailFiltersReducer,
    sorts: auditTrailSortsReducer,
    pagination: auditTrailPaginationReducer,
});

export default auditTrailReducer;
