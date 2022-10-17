import axiosInstance from '../default-setup/AxiosInstance';

const URL_CAMPAIGN = `${URL_API}/api/campaign`;

export default {
    fetchCampaigns: ({ pagination }) => {
        const requestUrl = `${URL_CAMPAIGN}/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekCampaigns: () => {
        const requestUrl = `${URL_CAMPAIGN}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
