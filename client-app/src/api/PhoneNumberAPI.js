import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_PHONE_NUMBER = `${URL_API}/api/phone-number`;

export default {
    newPhoneNumber: (phoneNumber) => {
        const requestUrl = `${URL_PHONE_NUMBER}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, phoneNumber)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    updatePhoneNumber: (phoneNumber) => {
        const requestUrl = `${URL_PHONE_NUMBER}/${phoneNumber.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, phoneNumber)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    deletePhoneNumber: (id) => {
        const requestUrl = `${URL_PHONE_NUMBER}/${id}/delete`;
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