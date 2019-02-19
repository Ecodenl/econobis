import axios from 'axios';

const URL_OBLIGATION_NUMBER = `${URL_API}/api/production-project/participant/obligation-number`;

export default {
    newObligationNumber: obligationNumber => {
        const requestUrl = `${URL_OBLIGATION_NUMBER}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, obligationNumber)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateObligationNumber: obligationNumber => {
        const requestUrl = `${URL_OBLIGATION_NUMBER}/${obligationNumber.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, obligationNumber)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteObligationNumber: id => {
        const requestUrl = `${URL_OBLIGATION_NUMBER}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
