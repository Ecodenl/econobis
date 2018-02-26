import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_PRODUCTION_PROJECT = `${URL_API}/api/production-project`;

export default {
    fetchProductionProjects: ({pagination}) => {
        const requestUrl = `${URL_PRODUCTION_PROJECT}/grid`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekProductionProjects: () => {
        const requestUrl = `${URL_PRODUCTION_PROJECT}/peek`;
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
