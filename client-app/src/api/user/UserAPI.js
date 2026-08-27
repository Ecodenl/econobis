import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchUserDetails: function(id) {
        const URL_USER = `${getApiUrl()}/api/user`;
        const requestUrl = `${URL_USER}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newUser: person => {
        const URL_USER = `${getApiUrl()}/api/user`;
        const requestUrl = `${URL_USER}`;

        return getAxiosInstance().post(requestUrl, person);
    },

    updateUser: person => {
        const URL_USER = `${getApiUrl()}/api/user`;
        const requestUrl = `${URL_USER}/${person.id}`;

        return getAxiosInstance().post(requestUrl, person);
    },
    unblockUser: userId => {
        const URL_USER = `${getApiUrl()}/api/user`;
        const requestUrl = `${URL_USER}/${userId}/unblock`;

        return getAxiosInstance().post(requestUrl);
    },

    addRole: (userId, roleId) => {
        const URL_USER = `${getApiUrl()}/api/user`;
        const requestUrl = `${URL_USER}/${userId}/roles/add/${roleId}`;

        return getAxiosInstance().post(requestUrl);
    },

    removeRole: (userId, roleId) => {
        const URL_USER = `${getApiUrl()}/api/user`;
        const requestUrl = `${URL_USER}/${userId}/roles/remove/${roleId}`;

        return getAxiosInstance().post(requestUrl);
    },

    resetTwoFactor: userId => {
        const URL_USER = `${getApiUrl()}/api/user`;
        const requestUrl = `${URL_USER}/${userId}/reset-two-factor`;

        return getAxiosInstance().post(requestUrl);
    },

    getRolesPermissionsExcel: () => {
        const URL_USER = `${getApiUrl()}/api/user`;
        const requestUrl = `${URL_USER}/rolesPermissionsExcel`;
        return getAxiosInstance().get(requestUrl, {
            responseType: 'blob',
        });
    },
};
