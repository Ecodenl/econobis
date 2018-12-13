import axios from 'axios';

const URL_EMAIL_ADDRESS = `${URL_API}/api/email-address`;

export default {
    newEmailAddress: (emailAddress) => {
        const requestUrl = `${URL_EMAIL_ADDRESS}`;
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
        const requestUrl = `${URL_EMAIL_ADDRESS}/${emailAddress.id}`;
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
        const requestUrl = `${URL_EMAIL_ADDRESS}/${id}/delete`;
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

    fetchEmailAddressessPeek: () => {
        const requestUrl = `${URL_API}/api/email/new/peek`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    fetchPrimaryEmailAddressId: (contactIds) => {
        const requestUrl = `${URL_API}/api/contact/get-primary-email-addresses-id`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        return axios.get(requestUrl, {
            params: {
                contactIds: contactIds,
            }})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};