import { combineReducers } from 'redux';

import campaignDetailsViewReducer from './CampaignDetailsViewReducer';
import campaignPaginationReducer from './CampaignPaginationReducer';

const campaignReducer = combineReducers({
    details: campaignDetailsViewReducer,
    pagination: campaignPaginationReducer,
});

export default campaignReducer;
