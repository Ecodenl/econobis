import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_EMAIL = `${URL_API}/api/email`;

export default {
    fetchEmails: () => {
        const requestUrl = `${URL_EMAIL}/grid/in-folder/inbox`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    fetchEmail: (id) => {
        const requestUrl = `${URL_EMAIL}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    associateContact: (emailId, contactId) => {
        const requestUrl = `${URL_EMAIL}/${emailId}/${contactId}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    downloadAttachment: (id) => {
        const requestUrl = `${URL_EMAIL}/email-attachment/${id}/download`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {responseType: 'blob'});
    }

};

