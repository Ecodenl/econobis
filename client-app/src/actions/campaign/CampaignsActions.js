export const fetchCampaigns = () => {
    return {
        type: 'FETCH_CAMPAIGNS',
    };
};

export const clearCampaigns = () => {
    return {
        type: 'CLEAR_CAMPAIGNS'
    };
};

export const fetchCampaign = (id) => {
    return {
        type: 'FETCH_CAMPAIGN',
        id,
    };
};

export const clearCampaign = () => {
    return {
        type: 'CLEAR_CAMPAIGN'
    };
};
