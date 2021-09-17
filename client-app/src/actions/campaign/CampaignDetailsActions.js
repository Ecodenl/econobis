export const fetchCampaign = (id, pagination) => {
    return {
        type: 'FETCH_CAMPAIGN',
        id,
        pagination,
    };
};

export const deleteCampaign = id => {
    return {
        type: 'DELETE_CAMPAIGN',
        id,
    };
};

export const clearCampaign = () => {
    return {
        type: 'CLEAR_CAMPAIGN',
    };
};
