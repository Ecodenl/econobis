import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchCampaigns: ({ pagination }) => {
        const URL_CAMPAIGN = `${getApiUrl()}/api/campaign`;
        const requestUrl = `${URL_CAMPAIGN}/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekCampaigns: () => {
        const URL_CAMPAIGN = `${getApiUrl()}/api/campaign`;
        const requestUrl = `${URL_CAMPAIGN}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekNotFinishedCampaigns: () => {
        const URL_CAMPAIGN = `${getApiUrl()}/api/campaign`;
        const requestUrl = `${URL_CAMPAIGN}/peeknotfinished`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
