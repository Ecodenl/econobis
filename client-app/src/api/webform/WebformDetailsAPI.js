import axiosInstance from '../default-setup/AxiosInstance';

const URL_WEBFORM = `${URL_API}/api/webform`;

export default {
    fetchWebformDetails: id => {
        const requestUrl = `${URL_WEBFORM}/${id}`;

        return axiosInstance.get(requestUrl);
    },

    newWebform: webform => {
        const requestUrl = URL_WEBFORM;

        return axiosInstance.post(requestUrl, webform);
    },

    updateWebform: webform => {
        const requestUrl = `${URL_WEBFORM}/${webform.id}`;

        return axiosInstance.post(requestUrl, webform);
    },
};
