export const fetchCampaigns = pagination => {
    return {
        type: 'FETCH_CAMPAIGNS',
        pagination,
    };
};

export const clearCampaigns = () => {
    return {
        type: 'CLEAR_CAMPAIGNS',
    };
};
