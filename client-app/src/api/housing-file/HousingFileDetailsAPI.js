import axios from 'axios';

const URL_HOUSING_FILE = `${URL_API}/api/housing-file`;

export default {
    fetchHousingFilesDetails: function (id) {
        const requestUrl = `${URL_HOUSING_FILE}/${id}`;
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

    newHousingFile: (housingFile) => {
        const requestUrl = `${URL_API}/api/contact/housing-file`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, housingFile)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateHousingFile: (housingFile) => {
        const requestUrl = `${URL_HOUSING_FILE}/${housingFile.id}/update`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, housingFile)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    deleteHousingFile: (id) => {
        const requestUrl = `${URL_HOUSING_FILE}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    attachMeasureTaken: (measureTaken) => {
        const requestUrl = `${URL_HOUSING_FILE}/measure-taken`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, measureTaken);
    },

    detachMeasureTaken: (addressId, measureId) => {
        const requestUrl = `${URL_HOUSING_FILE}/${addressId}/${measureId}/detach`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error;
            });
    },
};