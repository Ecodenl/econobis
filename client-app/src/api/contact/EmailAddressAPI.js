import axiosInstance from '../default-setup/AxiosInstance';
import axios from 'axios';

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

let cancelToken;

const URL_EMAIL_ADDRESS = `${URL_API}/api/email-address`;

export default {
    newEmailAddress: emailAddress => {
        const requestUrl = `${URL_EMAIL_ADDRESS}`;

        return axiosInstance
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

        return axiosInstance
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

        return axiosInstance
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
        cancelToken = axiosInstance.CancelToken.source();

        return axiosInstance.get(requestUrl, {
            cancelToken: cancelToken.token,
        });
    },

    fetchPrimaryEmailAddressId: contactIds => {
        const requestUrl = `${URL_API}/api/contact/get-primary-email-addresses-id`;

        return axiosInstance
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
