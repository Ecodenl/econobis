import { put, call, all } from 'redux-saga/effects';
import AuditTrailAPI from '../../api/audit-trail/AuditTrailAPI';

export function* fetchAuditTrailSaga({ filters, sorts, pagination }) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_AUDIT_TRAIL_LOADING' });
        const auditTrail = yield call(AuditTrailAPI.fetchAuditTrail, { filters, sorts, pagination });
        yield all([
            put({ type: 'FETCH_AUDIT_TRAIL_LOADING_SUCCESS' }),
            put({ type: 'FETCH_AUDIT_TRAIL_SUCCESS', auditTrail }),
        ]);
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_AUDIT_TRAIL_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
