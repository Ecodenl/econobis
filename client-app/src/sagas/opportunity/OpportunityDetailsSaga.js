import { put, call } from 'redux-saga/effects';
import OpportunityDetailsAPI from '../../api/opportunity/OpportunityDetailsAPI';

export function* fetchOpportunitySaga({ id }) {
    try {
        const opportunity = yield call(OpportunityDetailsAPI.fetchOpportunity, id);

        yield [
            put({ type: 'FETCH_OPPORTUNITY_SUCCESS', opportunity }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_OPPORTUNITY_ERROR', error });
    }
}