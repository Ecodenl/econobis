import { put, call } from 'redux-saga/effects';
import CampaignDetailsAPI from '../../api/campaign/CampaignDetailsAPI';

export function* fetchCampaignSaga({ id }) {
    try {
        const campaign = yield call(CampaignDetailsAPI.fetchCampaign, id);

        yield put({ type: 'FETCH_CAMPAIGN_SUCCESS', campaign });
        // Reload system data
        yield put({ type: 'FETCH_SYSTEM_DATA'});
    } catch (error) {
        yield put({ type: 'FETCH_CAMPAIGN_ERROR', error });
    }
}