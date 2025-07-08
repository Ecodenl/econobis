import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    getContactDetails: id => {
        const URL_CONTACTDETAILS = `${getApiUrl()}/api/contact`;
        const requestUrl = `${URL_CONTACTDETAILS}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getContactDetailsWithAddresses: id => {
        const URL_CONTACTDETAILS = `${getApiUrl()}/api/contact`;
        const requestUrl = `${URL_CONTACTDETAILS}/${id}/addresses`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateContactOwner: (contactId, userId) => {
        const URL_CONTACTDETAILS = `${getApiUrl()}/api/contact`;
        const requestUrl = `${URL_CONTACTDETAILS}/${contactId}/owner/${userId}/associate`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    makeHoomDossier: id => {
        const requestUrl = `contact/${id}/make-hoomdossier`;

        return getAxiosInstance().get(requestUrl);
    },

    getCoachAttributes: id => {
        const URL_CONTACTDETAILS = `${getApiUrl()}/api/contact`;
        const requestUrl = `${URL_CONTACTDETAILS}/${id}/coach-attributes`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            });
    },

    updateCoachAttributes: contact => {
        const URL_CONTACTDETAILS = `${getApiUrl()}/api/contact`;
        const requestUrl = `${URL_CONTACTDETAILS}/${contact.id}/coach-attributes`;

        return getAxiosInstance().post(requestUrl, contact);
    },
};
