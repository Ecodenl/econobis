import axios from 'axios';

const URL_TASK = `${URL_API}/api/task`;

export default {
    fetchTaskDetails: id => {
        const requestUrl = `${URL_TASK}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    newTask: task => {
        const requestUrl = URL_TASK;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, task);
    },

    updateTask: task => {
        const requestUrl = `${URL_TASK}/${task.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, task);
    },

    duplicateTask: id => {
        const requestUrl = `${URL_TASK}/${id}/duplicate`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    deleteTask: id => {
        const requestUrl = `${URL_TASK}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    storeTaskProperty: (id, data) => {
        const requestUrl = `${URL_API}/api/task/${id}/properties`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, data);
    },
    updateTaskProperty: (id, data) => {
        const requestUrl = `${URL_API}/api/task-property-value/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, data);
    },

    uploadTaskFile: (id, file) => {
        const requestUrl = `${URL_TASK}/${id}/attachments`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, file);
    },

    downloadAttachment: id => {
        const requestUrl = `${URL_API}/api/task-attachment/${id}/download`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, { responseType: 'blob' });
    },
};
