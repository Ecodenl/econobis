import { put, call } from 'redux-saga/effects';
import OpportunitiesAPI from '../../api/opportunity/OpportunitiesAPI';
import OpportunityDetailsAPI from '../../api/opportunity/OpportunityDetailsAPI';
import {hashHistory} from "react-router";

export function* fetchOpportunitiesSaga({filters, sorts, pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_OPPORTUNITIES_LOADING' });
        const opportunities = yield call(OpportunitiesAPI.fetchOpportunities, {filters, sorts, pagination});
        yield put({ type: 'FETCH_OPPORTUNITIES_SUCCESS', opportunities });
    } catch (error) {
        yield put({ type: 'FETCH_OPPORTUNITIES_ERROR', error });
    }
}

export function* deleteOpportunitySaga({ id }) {
    try {
        yield call(OpportunityDetailsAPI.deleteOpportunity, id);
        yield put({ type: 'DELETE_OPPORTUNITY_SUCCESS', id });
        hashHistory.push(`/kansen`);
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_OPPORTUNITY_ERROR', error });
    }
}