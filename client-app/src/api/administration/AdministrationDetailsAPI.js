import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchAdministrationDetails: function(id) {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    fetchAdministrationLogoDetails: function(id) {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${id}/logo-details`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    fetchTotalsInfoAdministration: function(id) {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${id}/totals-info-administration`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newAdministration: administration => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}`;

        return getAxiosInstance()
            .post(requestUrl, administration)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateAdministration: ({ administration, administrationId }) => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${administrationId}`;

        return getAxiosInstance()
            .post(requestUrl, administration)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteAdministration: id => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    attachUser: administrationUser => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${administrationUser.administrationId}/${administrationUser.userId}/attach`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response;
            })
            .catch(function(error) {
                return error;
            });
    },

    detachUser: ({ administrationId, userId }) => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${administrationId}/${userId}/detach`;

        return getAxiosInstance().post(requestUrl);
    },

    downloadSepa: sepaId => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/sepa/${sepaId}`;

        return getAxiosInstance().get(requestUrl);
    },

    deleteSepa: sepaId => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/sepa/${sepaId}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    syncSentInvoicesToTwinfield: id => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${id}/sync-invoices-to-twinfield`;

        return getAxiosInstance().post(requestUrl);
    },

    syncSentContactsToTwinfield: id => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${id}/sync-contacts-to-twinfield`;

        return getAxiosInstance().post(requestUrl);
    },

    syncSentInvoicesFromTwinfield: (id, fromDateSent) => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${id}/sync-invoices-from-twinfield`;

        return getAxiosInstance().post(requestUrl, {
            fromDateSent: fromDateSent,
        });
    },

    newLedger: ledger => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/ledger`;

        return getAxiosInstance()
            .post(requestUrl, ledger)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateLedger: ledger => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/ledger/${ledger.id}/update`;

        return getAxiosInstance()
            .post(requestUrl, ledger)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    fetchLedgers: id => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${id}/ledgers`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
