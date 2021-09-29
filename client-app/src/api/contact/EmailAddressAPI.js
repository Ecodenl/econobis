import axiosInstance from '../default-setup/AxiosInstance';
import axios from 'axios';

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

let cancelToken;

const URL_EMAIL_ADDRESS = `${URL_API}/api/email-address`;

export default {
    newEmailAddress: emailAddress => {
        const requestUrl = `${URL_EMAIL_ADDRESS}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, emailAddress)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateEmailAddress: emailAddress => {
        const requestUrl = `${URL_EMAIL_ADDRESS}/${emailAddress.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, emailAddress)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteEmailAddress: id => {
        const requestUrl = `${URL_EMAIL_ADDRESS}/${id}/delete`;
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

    fetchEmailAddressessSearch: searchTermContact => {
        const requestUrl = `${URL_API}/api/email/search?searchTerm=${searchTermContact}`;

        if (typeof cancelToken != typeof undefined) {
            //Check if there are any previous pending requests
            cancelToken.cancel('Api call canceled due to new request.');
        }

        //Save the cancel token for the current request
        cancelToken = axios.CancelToken.source();

        return axiosInstance.get(requestUrl, {
            cancelToken: cancelToken.token,
        });
    },

    fetchPrimaryEmailAddressId: contactIds => {
        const requestUrl = `${URL_API}/api/contact/get-primary-email-addresses-id`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .get(requestUrl, {
                params: {
                    contactIds: contactIds,
                },
            })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
