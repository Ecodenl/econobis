import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_REVENUE = `${URL_API}/api/production-project/revenue`;

export default {
    fetchProductionProjectRevenue: (id) => {
        const requestUrl = `${URL_REVENUE}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    updateProductionProjectRevenue: (id, data) => {
        const requestUrl = `${URL_REVENUE}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    storeProductionProjectRevenue: (data) => {
        const requestUrl = `${URL_REVENUE}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    deleteProductionProjectRevenue: (id) => {
        const requestUrl = `${URL_REVENUE}/${id}/delete`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    createParticipantRapport: (templateId, distributionIds) => {
        const requestUrl = `${URL_REVENUE}/create-participant-rapport/${templateId}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, {distributionIds: distributionIds})
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },
};
