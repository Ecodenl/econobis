import axiosInstance from '../default-setup/AxiosInstance';

const URL_WEBFORM = `${URL_API}/api/webform`;

export default {
    fetchWebforms: () => {
        const requestUrl = `${URL_WEBFORM}/grid`;

        return axiosInstance.get(requestUrl);
    },

    deleteWebform: id => {
        const requestUrl = `${URL_WEBFORM}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },
};
