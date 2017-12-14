import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_TASK = `${URL_API}/api/task`;

export default {
    fetchTaskDetails: (id) => {
        const requestUrl = `${URL_TASK}/${id}`;
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

    newTask: (task) => {
        const requestUrl = URL_TASK;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, task);
    },

    updateTask: (task) => {
        const requestUrl = `${URL_TASK}/${task.id}/update`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, task)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    deleteTask: (id) => {
        const requestUrl = `${URL_TASK}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    newTaskNote: (note) => {
        const requestUrl = `${URL_TASK}/${note.taskId}/note`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, note)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    updateTaskNote: (note) => {
        const requestUrl = `${URL_TASK}/note/${note.id}/update`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, note)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    deleteTaskNote: (id) => {
        const requestUrl = `${URL_TASK}/note/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
    },
};