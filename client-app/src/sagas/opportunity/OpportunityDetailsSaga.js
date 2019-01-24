import { put, call } from 'redux-saga/effects';
import OpportunityDetailsAPI from '../../api/opportunity/OpportunityDetailsAPI';

export function* fetchOpportunitySaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const opportunity = yield call(OpportunityDetailsAPI.fetchOpportunity, id);
        yield put({ type: 'FETCH_OPPORTUNITY_SUCCESS', opportunity });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_OPPORTUNITY_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
