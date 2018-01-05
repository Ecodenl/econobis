import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_USER = `${URL_API}/api/user`;

export default {
    fetchUsers: () => {
        const requestUrl = `${URL_USER}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                    console.log(error);
                }
            );
    },

    fetchUsersWithPermission: (permissionId) => {
        const requestUrl = `${URL_USER}/with-permission/${permissionId}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};