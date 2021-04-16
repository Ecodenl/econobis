import axios from 'axios';

const URL_ADDRESS = `${URL_API}/api/address`;

export default {
    newAddress: address => {
        const requestUrl = `${URL_ADDRESS}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, address);
    },

    updateAddress: address => {
        const requestUrl = `${URL_ADDRESS}/${address.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, address);
    },

    deleteAddress: id => {
        const requestUrl = `${URL_ADDRESS}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    getPicoAddress: (postalCode, number) => {
        const requestUrl = `${URL_ADDRESS}/pico`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, { postalCode: postalCode, number: number })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
