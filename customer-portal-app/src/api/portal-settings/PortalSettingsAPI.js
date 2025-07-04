import axiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS = `portal-settings`;

export default {
    fetchPortalSettings: id => {
        const requestUrl = `${URL_PORTAL_SETTINGS}/${id}`;

        return axiosInstance.get(requestUrl);
    },
    fetchPortalActive: () => {
        const requestUrl = `${URL_PORTAL_SETTINGS}/portal-active`;

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
    fetchNewAtCooperativeLinkText: () => {
        const requestUrl = `${URL_PORTAL_SETTINGS}/new-at-cooperative-link-text`;

        return axiosInstance.get(requestUrl);
    },
};
