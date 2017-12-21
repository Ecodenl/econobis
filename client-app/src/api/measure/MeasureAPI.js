import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_MEASURE = `${URL_API}/api/measure`;

export default {
    fetchMeasureGrid: () => {
        const requestUrl = `${URL_MEASURE}/grid`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                console.log(error);
            },
            );
    },

    fetchMeasure: (id) => {
        const requestUrl = `${URL_MEASURE}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    updateMeasure: (id, data) => {
        const requestUrl = `${URL_MEASURE}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    storeMeasure: (data) => {
        const requestUrl = `${URL_MEASURE}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    deleteMeasure: (id) => {
        const requestUrl = `${URL_MEASURE}/${id}/delete`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    storeFaq: (measureId, data) => {
        const requestUrl = `${URL_MEASURE}/${measureId}/faq`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    deleteFaq: (id) => {
        const requestUrl = `${URL_MEASURE}/faq/${id}/delete`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    updateFaq: (faq) => {
        const requestUrl = `${URL_MEASURE}/faq/${faq.id}/update`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, faq)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    attachSupplier: (measureId, organisationId) => {
        const requestUrl = `${URL_MEASURE}/${measureId}/supplier/${organisationId}/attach`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    detachSupplier: (measureId, organisationId) => {
        const requestUrl = `${URL_MEASURE}/${measureId}/supplier/${organisationId}/detach`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    associateOpportunity: (measureId, opportunityId) => {
        const requestUrl = `${URL_MEASURE}/${measureId}/opportunity/${opportunityId}/associate`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    // peekMeasures: () => {
    //     const requestUrl = `${URL_MEASURE}/peek`;
    //     const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
    //     axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    //
    //     return axios.get(requestUrl)
    //         .then(function (response) {
    //             return response.data.data;
    //         })
    //         .catch(function (error) {
    //                 console.log(error);
    //             }
    //         );
    // },
};
