import axiosInstance from '../default-setup/AxiosInstance';

const URL_CONTACT_PORTAL_USER = `${URL_API}/api/contact-portal-user`;

export default {
    updatePortalUser: portalUser => {
        const requestUrl = `${URL_CONTACT_PORTAL_USER}/${portalUser.id}`;

        return axiosInstance.post(requestUrl, portalUser);
    },

    deletePortalUser: id => {
        const requestUrl = `${URL_CONTACT_PORTAL_USER}/${id}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    resetTwoFactor: (id) => {
        const requestUrl = `${URL_CONTACT_PORTAL_USER}/${id}/reset-two-factor`;

        return axiosInstance.post(requestUrl);
    },
};
