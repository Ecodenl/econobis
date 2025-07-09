import { put, call } from 'redux-saga/effects';
import OpportunitiesAPI from '../../api/opportunity/OpportunitiesAPI';
import OpportunityDetailsAPI from '../../api/opportunity/OpportunityDetailsAPI';

export function* fetchOpportunitiesSaga({ filters, sorts, pagination }) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_OPPORTUNITIES_LOADING' });
        const opportunities = yield call(OpportunitiesAPI.fetchOpportunities, { filters, sorts, pagination });
        yield put({ type: 'FETCH_OPPORTUNITIES_SUCCESS', opportunities });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_OPPORTUNITIES_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteOpportunitySaga({ id, contactId }) {
    try {
        yield call(OpportunityDetailsAPI.deleteOpportunity, id);
        yield put({ type: 'DELETE_OPPORTUNITY_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_OPPORTUNITY_ERROR', error });
    }
}
