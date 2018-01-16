import { combineReducers } from 'redux';

import campaignsListReducer from './CampaignsListReducer';
import campaignsPaginationReducer from './CampaignsPaginationReducer';

const campaignsReducer = combineReducers({
    list: campaignsListReducer,
    pagination: campaignsPaginationReducer,
});

export default campaignsReducer;
