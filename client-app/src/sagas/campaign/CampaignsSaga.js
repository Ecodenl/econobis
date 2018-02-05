import { put, call } from 'redux-saga/effects';
import CampaignsAPI from '../../api/campaign/CampaignsAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchCampaignsSaga({pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_CAMPAIGNS_LOADING' });
        const campaigns = yield call(CampaignsAPI.fetchCampaigns, {pagination});
        yield put({ type: 'FETCH_CAMPAIGNS_SUCCESS', campaigns });
    } catch (error) {
        yield put({ type: 'FETCH_CAMPAIGNS_ERROR', error });
    }
}