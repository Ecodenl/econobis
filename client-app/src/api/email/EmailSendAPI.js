import axiosInstance from '../default-setup/AxiosInstance';

const URL_EMAIL = `${URL_API}/api/email-send`;

export default {
    fetchEmail: id => {
        return axiosInstance
            .get(`${URL_EMAIL}/${id}`)
            .then(response => response.data);
    },

    saveConcept: (id, attributes) => {
        return axiosInstance
            .post(`${URL_EMAIL}/${id}/save-concept`, attributes)
            .then(response => response.data);
    },

    send: (id) => {
        return axiosInstance
            .post(`${URL_EMAIL}/${id}/send`);
    }
};