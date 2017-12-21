import { put, call } from 'redux-saga/effects';
import OpportunityAPI from '../../api/opportunity/OpportunityAPI';

export function* fetchOpportunitiesSaga() {
    try {
        const opportunities = yield call(OpportunityAPI.fetchOpportunityGrid);

        yield [
            put({ type: 'FETCH_OPPORTUNITIES_SUCCESS', opportunities }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_OPPORTUNITIES_ERROR', error });
    }
}

export function* fetchOpportunitySaga({ id }) {
    try {
        const opportunity = yield call(OpportunityAPI.fetchOpportunity, id);

        yield [
            put({ type: 'FETCH_OPPORTUNITY_SUCCESS', opportunity }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_OPPORTUNITY_ERROR', error });
    }
}