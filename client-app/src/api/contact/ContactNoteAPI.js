import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    newNote: note => {
        const URL_CONTACT_NOTE = `${getApiUrl()}/api/contact-note`;
        const requestUrl = `${URL_CONTACT_NOTE}`;

        return getAxiosInstance()
            .post(requestUrl, note)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateNote: note => {
        const URL_CONTACT_NOTE = `${getApiUrl()}/api/contact-note`;
        const requestUrl = `${URL_CONTACT_NOTE}/${note.id}`;

        return getAxiosInstance()
            .post(requestUrl, note)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteNote: id => {
        const URL_CONTACT_NOTE = `${getApiUrl()}/api/contact-note`;
        const requestUrl = `${URL_CONTACT_NOTE}/${id}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
