import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_ADMINISTRATION = `${URL_API}/api/administration`;

export default {
    fetchAdministrationDetails: function (id) {
        const requestUrl = `${URL_ADMINISTRATION}/${id}`;
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

    newAdministration: (administration) => {
        const requestUrl = `${URL_ADMINISTRATION}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, administration)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateAdministration: ({administration, administrationId}) => {
        const requestUrl = `${URL_ADMINISTRATION}/${administrationId}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, administration)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    deleteAdministration: (id) => {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    attachUser: (administrationId, userId) => {
        const requestUrl = `${URL_ADMINISTRATION}/${administrationId}/${userId}/attach`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error;
            });
    },

    detachUser: (administrationId, userId) => {
        const requestUrl = `${URL_ADMINISTRATION}/${administrationId}/${userId}/detach`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },
};