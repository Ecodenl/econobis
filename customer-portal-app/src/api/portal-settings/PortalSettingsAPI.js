import axiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS = `setting`;

export default {
    fetchPortalSettings: keys => {
        const requestUrl = `${URL_PORTAL_SETTINGS}/multiple${keys}`;

        return axiosInstance.get(requestUrl);
    },
    fetchCooperativeName: () => {
        const requestUrl = `${URL_PORTAL_SETTINGS}/cooperative-name`;

        return axiosInstance.get(requestUrl);
    },
    fetchShowNewAtCooperativeLink: () => {
        const requestUrl = `${URL_PORTAL_SETTINGS}/show-new-at-cooperative-link`;

        return axiosInstance.get(requestUrl);
    },
};
