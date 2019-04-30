import axios from 'axios';

const URL_PARTICIPANT_TRANSACTION = `${URL_API}/api/production-project/participant/transaction`;

export default {
    newParticipantTransaction: participantTransaction => {
        const requestUrl = `${URL_PARTICIPANT_TRANSACTION}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, participantTransaction)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateParticipantTransaction: participantTransaction => {
        const requestUrl = `${URL_PARTICIPANT_TRANSACTION}/${participantTransaction.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, participantTransaction)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteParticipantTransaction: id => {
        const requestUrl = `${URL_PARTICIPANT_TRANSACTION}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
