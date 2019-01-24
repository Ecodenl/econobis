import axios from 'axios';

const URL_PARTICIPANT_PRODUCTION_PROJECT = `${URL_API}/api/production-project/participant`;

export default {
    fetchParticipantProductionProject: id => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateParticipantProductionProject: (id, data) => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeParticipantProductionProject: data => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data);
    },

    transferParticipation: data => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/transfer`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteParticipantProductionProject: id => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/${id}/delete`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    getContactsMembershipPeek: participantId => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/${participantId}/peek-members`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
