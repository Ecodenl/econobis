import { put, call } from 'redux-saga/effects';
import CampaignDetailsAPI from '../../api/campaign/CampaignDetailsAPI';
import { hashHistory } from 'react-router';

export function* fetchCampaignSaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const campaign = yield call(CampaignDetailsAPI.fetchCampaign, id);
        yield put({ type: 'FETCH_CAMPAIGN_SUCCESS', campaign });
        // Reload system data
        yield put({ type: 'FETCH_SYSTEM_DATA' });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_CAMPAIGN_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteCampaignSaga({ id }) {
    try {
        yield call(CampaignDetailsAPI.deleteCampaign, id);
        yield put({ type: 'DELETE_CAMPAIGN_SUCCESS', id });
        hashHistory.push(`/campagnes`);
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_CAMPAIGN_ERROR', error });
    }
}
