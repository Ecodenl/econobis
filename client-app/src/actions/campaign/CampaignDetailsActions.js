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
