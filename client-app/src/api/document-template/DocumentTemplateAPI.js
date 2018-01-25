import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_DOCUMENT_TEMPLATE = `${URL_API}/api/document-template`;

export default {
    fetchDocumentTemplates: () => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    fetchDocumentTemplate: (id) => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    storeDocumentTemplate: (data) => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    updateDocumentTemplate: (data) => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/${data.id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    fetchDocumentTemplatesPeekGeneral: () => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/peekGeneral`;
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


    fetchDocumentTemplatesPeekNotGeneral: () => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/peekNotGeneral`;
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

    deleteDocumentTemplate: (id) => {
        const requestUrl = `${URL_DOCUMENT_TEMPLATE}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
    },

};

