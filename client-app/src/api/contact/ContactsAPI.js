import axios from 'axios';
import axiosInstance from '../default-setup/AxiosInstance';

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

let cancelToken;

export default {
    fetchContacts: ({ filters, extraFilters, sorts, pagination, filterType }) => {
        const requestUrl = `${URL_API}/api/contact/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
                filterType: filterType,
            },
        });
    },

    deleteContact: id => {
        const requestUrl = `${URL_API}/api/contact/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    deleteContacts: ids => {
        const requestUrl = `${URL_API}/api/contacts/delete`;

        return axiosInstance
            .post(requestUrl, { ids: ids })
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    mergeContacts: (toId, fromId) => {
        return axiosInstance.post('contacts/merge', { toId, fromId });
    },

    getPerson: (inspectionPersonType = null) => {
        const requestUrl = `${URL_API}/api/contact/peek/${inspectionPersonType}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getContactsPeek: () => {
        const requestUrl = `${URL_API}/api/contact/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    getContactsAddressesPeek: () => {
        const requestUrl = `${URL_API}/api/contact/address/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchContactSearch: (searchTermContact, inspectionPersonType = null) => {
        const requestUrl = `${URL_API}/api/contact/search/${inspectionPersonType}/?searchTerm=${searchTermContact}`;

        if (typeof cancelToken != typeof undefined) {
            //Check if there are any previous pending requests
            cancelToken.cancel('Api call canceled due to new request.');
        }

        //Save the cancel token for the current request
        cancelToken = axios.CancelToken.source();

        return axiosInstance.get(requestUrl, {
            cancelToken: cancelToken.token,
        });
    },

    getCSV: ({ filters, extraFilters, sorts, filterType }) => {
        const requestUrl = `${URL_API}/api/contact/csv`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                filterType: filterType,
            },
        });
    },

    getFreeFieldsCSV: ({ filters, extraFilters, sorts, filterType }) => {
        const requestUrl = `${URL_API}/api/contact/free-fields-csv`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                filterType: filterType,
            },
        });
    },

    getEnergySuppliersCSV: ({ filters, extraFilters, sorts, filterType }) => {
        const requestUrl = `${URL_API}/api/contact/energy-suppliers-csv`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                filterType: filterType,
            },
        });
    },

    getExcelAddressEnergyConsumptionGas: ({ filters, extraFilters, sorts, pagination }) => {
        const requestUrl = `${URL_API}/api/contact/excel/verbruik/gas`;

        return axiosInstance.get(requestUrl, {
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
        const requestUrl = `${URL_API}/api/contact/excel/verbruik/electriciteit`;

        return axiosInstance.get(requestUrl, {
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
        const requestUrl = `${URL_API}/api/contact/save-as-group`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                filterType: filterType,
            },
        });
    },

    validateImport: csv => {
        const requestUrl = `${URL_API}/api/contact/validate-import`;

        return axiosInstance.post(requestUrl, csv);
    },

    import: csv => {
        const requestUrl = `${URL_API}/api/contact/import`;

        return axiosInstance.post(requestUrl, csv);
    },

    validateImportfromenergiesupplier: csv => {
        const requestUrl = `${URL_API}/api/contact/validate-importfromenergiesupplier`;

        return axiosInstance.post(requestUrl, csv);
    },

    importfromenergiesupplier: csv => {
        const requestUrl = `${URL_API}/api/contact/importfromenergiesupplier`;

        return axiosInstance.post(requestUrl, csv);
    },

    getContactsToImportSuppliers: () => {
        const requestUrl = `${URL_API}/api/contact/contactstoimportsuppliers`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getChartData: () => {
        const requestUrl = `${URL_API}/api/contact/chart-data`;

        return axiosInstance.get(requestUrl);
    },
};
