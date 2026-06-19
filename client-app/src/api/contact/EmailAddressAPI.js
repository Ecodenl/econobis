import getAxiosInstance from '../default-setup/AxiosInstance';
import axios from 'axios';
import { getApiUrl } from '../utils/ApiUrl';

// try {
//     getAxiosInstance().CancelToken = axios.CancelToken;
//     getAxiosInstance().isCancel = axios.isCancel;
// } catch (e) {
//     console.warn('Axios instance is nog niet beschikbaar bij load time:', e.message);
// }
//
let cancelToken;

export default {
    newEmailAddress: emailAddress => {
        const URL_EMAIL_ADDRESS = `${getApiUrl()}/api/email-address`;
        const requestUrl = `${URL_EMAIL_ADDRESS}`;

        return getAxiosInstance()
            .post(requestUrl, emailAddress)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateEmailAddress: emailAddress => {
        const URL_EMAIL_ADDRESS = `${getApiUrl()}/api/email-address`;
        const requestUrl = `${URL_EMAIL_ADDRESS}/${emailAddress.id}`;

        return getAxiosInstance()
            .post(requestUrl, emailAddress)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteEmailAddress: id => {
        const URL_EMAIL_ADDRESS = `${getApiUrl()}/api/email-address`;
        const requestUrl = `${URL_EMAIL_ADDRESS}/${id}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    fetchEmailAddressessSearch: searchTermContact => {
        const requestUrl = `${getApiUrl()}/api/email/search?searchTerm=${searchTermContact}`;
        getAxiosInstance().CancelToken = axios.CancelToken;
        getAxiosInstance().isCancel = axios.isCancel;

        if (typeof cancelToken != typeof undefined) {
            //Check if there are any previous pending requests
            cancelToken.cancel('Api call canceled due to new request.');
        }

        //Save the cancel token for the current request
        cancelToken = getAxiosInstance().CancelToken.source();

        return getAxiosInstance().get(requestUrl, {
            cancelToken: cancelToken.token,
        });
    },

    fetchPrimaryEmailAddressId: contactIds => {
        const requestUrl = `${getApiUrl()}/api/contact/get-primary-email-addresses-id`;

        return getAxiosInstance()
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
