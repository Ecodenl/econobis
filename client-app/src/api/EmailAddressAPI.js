import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_TYPE = `${URL_API}/api/email-address`;

export default {
    newEmailAddress: (emailAddress) => {
        const requestUrl = `${URL_TYPE}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, emailAddress)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    updateEmailAddress: (emailAddress) => {
        const requestUrl = `${URL_TYPE}/${emailAddress.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, emailAddress)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    deleteEmailAddress: (id) => {
        const requestUrl = `${URL_TYPE}/${id}/delete`;
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
};