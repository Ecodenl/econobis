import axios from 'axios';
import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

// try {
//     getAxiosInstance().CancelToken = axios.CancelToken;
//     getAxiosInstance().isCancel = axios.isCancel;
// } catch (e) {
//     console.warn('Axios instance is nog niet beschikbaar bij load time:', e.message);
// }

let cancelToken;

export default {
    fetchContacts: ({ filters, extraFilters, sorts, pagination, filterType, dataControleType }) => {
        const requestUrl = `${getApiUrl()}/api/contact/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
                filterType: filterType,
                dataControleType: dataControleType,
            },
        });
    },

    deleteContact: id => {
        const requestUrl = `${getApiUrl()}/api/contact/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    deleteContacts: ids => {
        const requestUrl = `${getApiUrl()}/api/contacts/delete`;

        return getAxiosInstance()
            .post(requestUrl, { ids: ids })
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    mergeContacts: (toId, fromId) => {
        return getAxiosInstance().post('contacts/merge', { toId, fromId });
    },

    getPerson: (inspectionPersonType = null) => {
        const requestUrl = `${getApiUrl()}/api/contact/peek/${inspectionPersonType}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getContactsPeek: () => {
        const requestUrl = `${getApiUrl()}/api/contact/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    getContactsAddressesPeek: () => {
        const requestUrl = `${getApiUrl()}/api/contact/address/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchContactSearch: (searchTermContact, inspectionPersonType = null) => {
        const requestUrl = `${getApiUrl()}/api/contact/search/${inspectionPersonType}/?searchTerm=${searchTermContact}`;
        getAxiosInstance().CancelToken = axios.CancelToken;
        getAxiosInstance().isCancel = axios.isCancel;

        if (typeof cancelToken != typeof undefined) {
            //Check if there are any previous pending requests
            cancelToken.cancel('Api call canceled due to new request.');
        }

        //Save the cancel token for the current request
        cancelToken = axios.CancelToken.source();

        return getAxiosInstance().get(requestUrl, {
            cancelToken: cancelToken.token,
        });
    },

    getCSV: ({ filters, extraFilters, sorts, filterType, dataControleType }) => {
        const requestUrl = `${getApiUrl()}/api/contact/csv`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                filterType: filterType,
                dataControleType: dataControleType,
            },
        });
    },

    getFreeFieldsCSV: ({ filters, extraFilters, sorts, filterType }) => {
        const requestUrl = `${getApiUrl()}/api/contact/free-fields-csv`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                filterType: filterType,
            },
        });
    },

    getEnergySuppliersCSV: ({ filters, extraFilters, sorts, filterType }) => {
        const requestUrl = `${getApiUrl()}/api/contact/energy-suppliers-csv`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                filterType: filterType,
            },
        });
    },

    getExcelAddressEnergyConsumptionGas: ({ filters, extraFilters, sorts, pagination }) => {
        const requestUrl = `${getApiUrl()}/api/contact/excel/verbruik/gas`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
            responseType: 'blob',
        });
    },

    getExcelAddressEnergyConsumptionElectricity: ({ filters, extraFilters, sorts, pagination }) => {
        const requestUrl = `${getApiUrl()}/api/contact/excel/verbruik/electriciteit`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
            responseType: 'blob',
        });
    },

    saveAsGroup: ({ filters, extraFilters, filterType }) => {
        const requestUrl = `${getApiUrl()}/api/contact/save-as-group`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                filterType: filterType,
            },
        });
    },

    validateImport: csv => {
        const requestUrl = `${getApiUrl()}/api/contact/validate-import`;

        return getAxiosInstance().post(requestUrl, csv);
    },

    import: csv => {
        const requestUrl = `${getApiUrl()}/api/contact/import`;

        return getAxiosInstance().post(requestUrl, csv);
    },

    getChartData: () => {
        const requestUrl = `${getApiUrl()}/api/contact/chart-data`;

        return getAxiosInstance().get(requestUrl);
    },
};
