import { put, call } from 'redux-saga/effects';
import AuditTrailAPI from '../../api/audit-trail/AuditTrailAPI';

export function* fetchAuditTrailSaga({filters, sorts, pagination}) {
    try {
        yield [
            put({ type: 'FETCH_AUDIT_TRAIL_LOADING' }),
        ];
        const auditTrail = yield call(AuditTrailAPI.fetchAuditTrail, {filters, sorts, pagination});
        yield [
            put({ type: 'FETCH_AUDIT_TRAIL_LOADING_SUCCESS'}),
            put({ type: 'FETCH_AUDIT_TRAIL_SUCCESS', auditTrail }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_AUDIT_TRAIL_ERROR', error });
    }
}