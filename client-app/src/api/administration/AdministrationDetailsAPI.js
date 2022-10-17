import axiosInstance from '../default-setup/AxiosInstance';

const URL_ADMINISTRATION = `${URL_API}/api/administration`;

export default {
    fetchAdministrationDetails: function(id) {
        const requestUrl = `${URL_ADMINISTRATION}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    fetchAdministrationLogoDetails: function(id) {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/logo-details`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    fetchTotalsInfoAdministration: function(id) {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/totals-info-administration`;

        return axiosInstance
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

        return axiosInstance
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

        return axiosInstance
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

        return axiosInstance.post(requestUrl);
    },

    attachUser: administrationUser => {
        const requestUrl = `${URL_ADMINISTRATION}/${administrationUser.administrationId}/${administrationUser.userId}/attach`;

        return axiosInstance
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

        return axiosInstance.post(requestUrl);
    },

    downloadSepa: sepaId => {
        const requestUrl = `${URL_ADMINISTRATION}/sepa/${sepaId}`;

        return axiosInstance.get(requestUrl);
    },

    deleteSepa: sepaId => {
        const requestUrl = `${URL_ADMINISTRATION}/sepa/${sepaId}/delete`;

        return axiosInstance.post(requestUrl);
    },

    syncSentInvoicesToTwinfield: id => {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/sync-invoices-to-twinfield`;

        return axiosInstance.post(requestUrl);
    },

    syncSentContactsToTwinfield: id => {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/sync-contacts-to-twinfield`;

        return axiosInstance.post(requestUrl);
    },

    syncSentInvoicesFromTwinfield: (id, fromDateSent) => {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/sync-invoices-from-twinfield`;

        return axiosInstance.post(requestUrl, {
            fromDateSent: fromDateSent,
        });
    },

    newLedger: ledger => {
        const requestUrl = `${URL_ADMINISTRATION}/ledger`;

        return axiosInstance
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

        return axiosInstance
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

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
