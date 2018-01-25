import axios from 'axios';
import {clearError} from "../../actions/general/ErrorActions";
import {connect} from "react-redux";

const URL_API = process.env.URL_API;
const URL_DOCUMENT = `${URL_API}/api/document`;

export default {
    fetchDocumentDetails: (id) => {
        const requestUrl = `${URL_DOCUMENT}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    newDocument: (data) => {
        const requestUrl = `${URL_DOCUMENT}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data);
    },

    updateDocument: (document) => {
        const requestUrl = `${URL_DOCUMENT}/${document.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, document);
    },

    deleteDocument: (id) => {
        const requestUrl = `${URL_DOCUMENT}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    download: (id) => {
        const requestUrl = `${URL_DOCUMENT}/${id}/download`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {responseType: 'blob'});
    },
};
