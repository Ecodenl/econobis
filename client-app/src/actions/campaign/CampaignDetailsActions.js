export const fetchCampaign = (id) => {
    return {
        type: 'FETCH_CAMPAIGN',
        id,
    };
};

export const deleteCampaign = (id) => {
    return {
        type: 'DELETE_CAMPAIGN',
        id,
    };
};

export const clearCampaign = () => {
    return {
        type: 'CLEAR_CAMPAIGN'
    };
};
