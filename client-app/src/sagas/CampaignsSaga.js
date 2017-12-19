import { put, call } from 'redux-saga/effects';
import CampaignAPI from '../api/CampaignAPI';

export function* fetchCampaignsSaga() {
    try {
        const campaigns = yield call(CampaignAPI.fetchCampaignGrid);

        yield [
            put({ type: 'FETCH_CAMPAIGNS_SUCCESS', campaigns }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_CAMPAIGNS_ERROR', error });
    }
}

export function* fetchCampaignSaga({ id }) {
    try {
        const campaign = yield call(CampaignAPI.fetchCampaign, id);

        yield [
            put({ type: 'FETCH_CAMPAIGN_SUCCESS', campaign }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_CAMPAIGN_ERROR', error });
    }
}