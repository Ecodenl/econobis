import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_REGISTRATION = `${URL_API}/api/registration`;

export default {
    fetchRegistrationDetails: function (id) {
        const requestUrl = `${URL_REGISTRATION}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                    console.log(error);
                }
            );
    },

    newRegistration: (registration) => {
        const requestUrl = `${URL_API}/api/contact/registration`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, registration)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateRegistration: (registration) => {
        const requestUrl = `${URL_REGISTRATION}/${registration.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, registration)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};