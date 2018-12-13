import axios from 'axios';

const URL_CAMPAIGN = `${URL_API}/api/campaign`;

export default {
    fetchCampaigns: ({pagination}) => {
        const requestUrl = `${URL_CAMPAIGN}/grid`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekCampaigns: () => {
        const requestUrl = `${URL_CAMPAIGN}/peek`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                    console.log(error);
                }
            );
    },
};
