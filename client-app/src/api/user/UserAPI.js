import axios from 'axios';
import axiosInstance from '../default-setup/AxiosInstance';

const URL_USER = `${URL_API}/api/user`;

export default {
    fetchUserDetails: function(id) {
        const requestUrl = `${URL_USER}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
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
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, person);
    },

    updateUser: person => {
        const requestUrl = `${URL_USER}/${person.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, person);
    },

    addRole: (userId, roleId) => {
        const requestUrl = `${URL_USER}/${userId}/roles/add/${roleId}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    removeRole: (userId, roleId) => {
        const requestUrl = `${URL_USER}/${userId}/roles/remove/${roleId}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    getExcel: () => {
        const requestUrl = `${URL_USER}/excel`;
        return axiosInstance.get(requestUrl, {
            responseType: 'blob',
        });
    },
};
