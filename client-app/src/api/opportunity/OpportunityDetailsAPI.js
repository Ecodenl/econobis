import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_OPPORTUNITY = `${URL_API}/api/opportunity`;

export default {
    fetchOpportunity: (id) => {
        const requestUrl = `${URL_OPPORTUNITY}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    updateOpportunity: (id, data) => {
        const requestUrl = `${URL_OPPORTUNITY}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    storeOpportunity: (data) => {
        const requestUrl = `${URL_OPPORTUNITY}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    deleteOpportunity: (id) => {
        const requestUrl = `${URL_OPPORTUNITY}/${id}/delete`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    updateOpportunityQuotation: (data) => {
        const requestUrl = `${URL_OPPORTUNITY}/quotation/${data.id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    storeOpportunityQuotation: (opportunityId, data) => {
        const requestUrl = `${URL_OPPORTUNITY}/${opportunityId}/quotation`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },
};
