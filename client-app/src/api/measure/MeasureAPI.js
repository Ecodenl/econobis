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

    associateOrganisation: (measureId, organisationId) => {
        const requestUrl = `${URL_MEASURE}/${measureId}/organisation/${organisationId}/associate`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    dissociateOrganisation: (organisationId) => {
        const requestUrl = `${URL_MEASURE}/organisation/${organisationId}/dissociate`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    attachOpportunity: (measureId, opportunityId) => {
        const requestUrl = `${URL_MEASURE}/${measureId}/opportunity/${opportunityId}/attach`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    detachOpportunity: (measureId, opportunityId) => {
        const requestUrl = `${URL_MEASURE}/${measureId}/opportunity/${opportunityId}/detach`;
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
