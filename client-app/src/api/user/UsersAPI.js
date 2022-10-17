import axiosInstance from '../default-setup/AxiosInstance';

const URL_USER = `${URL_API}/api/user`;

export default {
    fetchUsers: () => {
        const requestUrl = `${URL_USER}/grid`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchUsersWithPermission: permissionId => {
        const requestUrl = `${URL_USER}/with-permission/${permissionId}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
