import axios from 'axios';

const URL_INTAKE = `${URL_API}/api/intake`;

export default {
    fetchIntakeDetails: function (id) {
        const requestUrl = `${URL_INTAKE}/${id}`;
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

    newIntake: (intake) => {
        const requestUrl = `${URL_API}/api/contact/intake`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, intake)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateIntake: (intake) => {
        const requestUrl = `${URL_INTAKE}/${intake.id}/update`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, intake)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    deleteIntake: (id) => {
        const requestUrl = `${URL_INTAKE}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    attachMeasureRequested: (intakeId, measureId) => {
        const requestUrl = `${URL_INTAKE}/${intakeId}/${measureId}/attach`;
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

    detachMeasureRequested: (intakeId, measureId) => {
        const requestUrl = `${URL_INTAKE}/${intakeId}/${measureId}/detach`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },
};