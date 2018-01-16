import { put, call } from 'redux-saga/effects';
import CampaignsAPI from '../../api/campaign/CampaignsAPI';

export function* fetchCampaignsSaga({pagination}) {
    try {
        yield [
            put({ type: 'FETCH_CAMPAIGNS_LOADING' }),
        ];
        const campaigns = yield call(CampaignsAPI.fetchCampaigns, {pagination});
        yield [
            put({ type: 'FETCH_CAMPAIGNS_SUCCESS', campaigns }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_CAMPAIGNS_ERROR', error });
    }
}