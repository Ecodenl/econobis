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
                return response.data.data;
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
        const requestUrl = `${URL_REGISTRATION}/${registration.id}/update`;
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

    deleteRegistration: (id) => {
        const requestUrl = `${URL_REGISTRATION}/${id}/delete`;
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

    newRegistrationMeasureTaken: (measureTaken) => {
        const requestUrl = `${URL_REGISTRATION}/${measureTaken.addressId}/measure-taken`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, measureTaken);
            // .then(function (response) {
            //     return response.data.data;
            // })
            // .catch(function (error) {
            //     return error;
            // });
    },

    deleteRegistrationMeasureTaken: (id) => {
        const requestUrl = `${URL_REGISTRATION}/${id}/measure-taken/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    newRegistrationMeasureRequested: (measureRequested) => {
        const requestUrl = `${URL_REGISTRATION}/${measureRequested.addressId}/measure-requested`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, measureRequested);
    },

    deleteRegistrationMeasureRequested: (id) => {
        const requestUrl = `${URL_REGISTRATION}/${id}/measure-requested/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    newRegistrationNote: (note) => {
        const requestUrl = `${URL_REGISTRATION}/${note.registrationId}/note`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, note)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    updateRegistrationNote: (note) => {
        const requestUrl = `${URL_REGISTRATION}/note/${note.id}/update`;
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
        const requestUrl = `${URL_REGISTRATION}/note/${id}/delete`;
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