import axiosInstance from '../default-setup/AxiosInstance';

const URL_EMAIL = `${URL_API}/api/email-details`;

export default {
    fetchEmail: id => {
        return axiosInstance
            .get(`${URL_EMAIL}/${id}`)
            .then(response => response.data);
    },
};