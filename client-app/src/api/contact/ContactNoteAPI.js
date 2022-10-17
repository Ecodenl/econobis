import axiosInstance from '../default-setup/AxiosInstance';

const URL_CONTACT_NOTE = `${URL_API}/api/contact-note`;

export default {
    newNote: note => {
        const requestUrl = `${URL_CONTACT_NOTE}`;

        return axiosInstance
            .post(requestUrl, note)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateNote: note => {
        const requestUrl = `${URL_CONTACT_NOTE}/${note.id}`;

        return axiosInstance
            .post(requestUrl, note)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteNote: id => {
        const requestUrl = `${URL_CONTACT_NOTE}/${id}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
