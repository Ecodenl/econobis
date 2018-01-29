import { put, call } from 'redux-saga/effects';
import OpportunitiesAPI from '../../api/opportunity/OpportunitiesAPI';

export function* fetchOpportunitiesSaga({pagination}) {
    try {
        yield put({ type: 'FETCH_OPPORTUNITIES_LOADING' });
        const opportunities = yield call(OpportunitiesAPI.fetchOpportunities, {pagination});
        yield put({ type: 'FETCH_OPPORTUNITIES_SUCCESS', opportunities });
    } catch (error) {
        yield put({ type: 'FETCH_OPPORTUNITIES_ERROR', error });
    }
}