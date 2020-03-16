import axios from 'axios';

const URL_ADMINISTRATION = `${URL_API}/api/administration`;

export default {
    fetchAdministrationDetails: function(id) {
        const requestUrl = `${URL_ADMINISTRATION}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    fetchTotalsInfoAdministration: function(id) {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/totals-info-administration`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newAdministration: administration => {
        const requestUrl = `${URL_ADMINISTRATION}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, administration)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateAdministration: ({ administration, administrationId }) => {
        const requestUrl = `${URL_ADMINISTRATION}/${administrationId}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, administration)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteAdministration: id => {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    attachUser: administrationUser => {
        const requestUrl = `${URL_ADMINISTRATION}/${administrationUser.administrationId}/${
            administrationUser.userId
        }/attach`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                return error;
            });
    },

    detachUser: ({ administrationId, userId }) => {
        const requestUrl = `${URL_ADMINISTRATION}/${administrationId}/${userId}/detach`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    downloadSepa: sepaId => {
        const requestUrl = `${URL_ADMINISTRATION}/sepa/${sepaId}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    deleteSepa: sepaId => {
        const requestUrl = `${URL_ADMINISTRATION}/sepa/${sepaId}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    syncSentInvoicesToTwinfield: id => {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/sync-invoices-to-twinfield`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    syncSentInvoicesFromTwinfield: id => {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/sync-invoices-from-twinfield`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    newLedger: ledger => {
        const requestUrl = `${URL_ADMINISTRATION}/ledger`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, ledger)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateLedger: ledger => {
        const requestUrl = `${URL_ADMINISTRATION}/ledger/${ledger.id}/update`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, ledger)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    fetchLedgers: id => {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/ledgers`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
