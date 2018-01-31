import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_OPPORTUNITY = `${URL_API}/api/opportunity`;

export default {
    fetchOpportunities: ({pagination}) => {
        const requestUrl = `${URL_OPPORTUNITY}/grid`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekOpportunities: () => {
        const requestUrl = `${URL_OPPORTUNITY}/peek`;
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

    getAmountActive: () => {
        const requestUrl = `${URL_OPPORTUNITY}/amount-active`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    getChartData: () => {
        const requestUrl = `${URL_OPPORTUNITY}/chart-data`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl);
    }
};
