import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchUsers: () => {
        const URL_USER = `${getApiUrl()}/api/user`;
        const requestUrl = `${URL_USER}/grid`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchUsersWithPermission: permissionId => {
        const URL_USER = `${getApiUrl()}/api/user`;
        const requestUrl = `${URL_USER}/with-permission/${permissionId}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
