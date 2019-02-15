import axios from 'axios';

const URL_PARTICIPANT_MUTATION = `${URL_API}/api/project/participant/mutation`;

export default {
    newParticipantMutation: participantMutation => {
        const requestUrl = `${URL_PARTICIPANT_MUTATION}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, participantMutation)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateParticipantMutation: participantMutation => {
        const requestUrl = `${URL_PARTICIPANT_MUTATION}/${participantMutation.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, participantMutation)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteParticipantMutation: id => {
        const requestUrl = `${URL_PARTICIPANT_MUTATION}/${id}/delete`;
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
