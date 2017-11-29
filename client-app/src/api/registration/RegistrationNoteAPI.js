import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_REGISTRATION_NOTE = `${URL_API}/api/registration`;

export default {
    newRegistrationNote: (note) => {
        const requestUrl = `${URL_REGISTRATION_NOTE}/${note.registrationId}/note`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, note)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    updateRegistrationNote: (note) => {
        const requestUrl = `${URL_REGISTRATION_NOTE}/note/${note.id}/update`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, note)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    deleteRegistrationNote: (id) => {
        const requestUrl = `${URL_REGISTRATION_NOTE}/note/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
    },
};