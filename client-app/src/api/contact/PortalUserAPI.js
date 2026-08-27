import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    updatePortalUser: portalUser => {
        const URL_CONTACT_PORTAL_USER = `${getApiUrl()}/api/contact-portal-user`;
        const requestUrl = `${URL_CONTACT_PORTAL_USER}/${portalUser.id}`;

        return getAxiosInstance().post(requestUrl, portalUser);
    },

    unblockUser: id => {
        const URL_USER = `${getApiUrl()}/api/contact-portal-user`;
        const requestUrl = `${URL_USER}/${id}/unblock`;

        return getAxiosInstance().post(requestUrl);
    },

    deletePortalUser: id => {
        const URL_CONTACT_PORTAL_USER = `${getApiUrl()}/api/contact-portal-user`;
        const requestUrl = `${URL_CONTACT_PORTAL_USER}/${id}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    resetTwoFactor: id => {
        const URL_CONTACT_PORTAL_USER = `${getApiUrl()}/api/contact-portal-user`;
        const requestUrl = `${URL_CONTACT_PORTAL_USER}/${id}/reset-two-factor`;

        return getAxiosInstance().post(requestUrl);
    },
};
