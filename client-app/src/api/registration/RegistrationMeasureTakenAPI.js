import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_MEASURE_TAKEN = `${URL_API}/api/measure-taken`;

export default {
    newRegistrationMeasureTaken: (measureTaken) => {
        const requestUrl = `${URL_MEASURE_TAKEN}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, measureTaken)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    updateRegistrationMeasureTaken: (measureTaken) => {
        const requestUrl = `${URL_MEASURE_TAKEN}/${measureTaken.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, measureTaken)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    deleteRegistrationMeasureTaken: (id) => {
        const requestUrl = `${URL_MEASURE_TAKEN}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },
};