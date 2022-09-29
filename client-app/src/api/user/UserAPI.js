import axiosInstance from "../default-setup/AxiosInstance";

const URL_USER = `${URL_API}/api/user`;

export default {
    fetchUserDetails: function(id) {
        const requestUrl = `${URL_USER}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newUser: person => {
        const requestUrl = `${URL_USER}`;

        return axiosInstance.post(requestUrl, person);
    },

    updateUser: person => {
        const requestUrl = `${URL_USER}/${person.id}`;

        return axiosInstance.post(requestUrl, person);
    },

    addRole: (userId, roleId) => {
        const requestUrl = `${URL_USER}/${userId}/roles/add/${roleId}`;

        return axiosInstance.post(requestUrl);
    },

    removeRole: (userId, roleId) => {
        const requestUrl = `${URL_USER}/${userId}/roles/remove/${roleId}`;

        return axiosInstance.post(requestUrl);
    },

    resetTwoFactor: (userId) => {
        const requestUrl = `${URL_USER}/${userId}/reset-two-factor`;

        return axiosInstance.post(requestUrl);
    },
};
