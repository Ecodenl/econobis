import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_TYPE = `${URL_API}/api/address`;

export default {
    newAddress: (address) => {
        const requestUrl = `${URL_TYPE}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, address)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    updateAddress: (address) => {
        const requestUrl = `${URL_TYPE}/${address.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, address)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    deleteAddress: (id) => {
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