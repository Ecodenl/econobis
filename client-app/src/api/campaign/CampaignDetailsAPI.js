import axios from 'axios';

const URL_CAMPAIGN = `${URL_API}/api/campaign`;

export default {
    fetchCampaign: ({ id, pagination }) => {
        const requestUrl = `${URL_CAMPAIGN}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        console.log(pagination);

        return axios
            .get(requestUrl + "?page=" + pagination.page)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateCampaign: (id, data) => {
        const requestUrl = `${URL_CAMPAIGN}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeCampaign: data => {
        const requestUrl = `${URL_CAMPAIGN}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteCampaign: id => {
        const requestUrl = `${URL_CAMPAIGN}/${id}/delete`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    attachResponse: (campaignId, contactId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/response/${contactId}/attach`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    detachResponse: (campaignId, contactId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/response/${contactId}/detach`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    attachOrganisation: (campaignId, organisationId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/organisation/${organisationId}/attach`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    detachOrganisation: (campaignId, organisationId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/organisation/${organisationId}/detach`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateCampaignOwner: (campaignId, userId) => {
        const requestUrl = `${URL_CAMPAIGN}/${campaignId}/owner/${userId}/associate`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },
};
