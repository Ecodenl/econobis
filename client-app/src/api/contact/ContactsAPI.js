import axios from 'axios';
import axiosInstance from '../default-setup/AxiosInstance';

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

let cancelToken;

export default {
    fetchContacts: ({ filters, extraFilters, sorts, pagination, filterType }) => {
        const requestUrl = `${URL_API}/api/contact/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
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
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    deleteContacts: ids => {
        const requestUrl = `${URL_API}/api/contacts/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, { ids: ids })
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    mergeContacts: ids => {
        return axiosInstance
            .post('contacts/merge', { ids: ids });
    },

    getPerson: () => {
        const requestUrl = `${URL_API}/api/contact/peek`;
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

    getContactsPeek: () => {
        const requestUrl = `${URL_API}/api/contact/peek`;
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
    getContactsAddressesPeek: () => {
        const requestUrl = `${URL_API}/api/contact/address/peek`;
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

    fetchContactSearch: searchTermContact => {
        const requestUrl = `${URL_API}/api/contact/search?searchTerm=${searchTermContact}`;

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

    getCSV: ({ filters, extraFilters, sorts }) => {
        const requestUrl = `${URL_API}/api/contact/csv`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
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
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                filterType: filterType,
            },
        });
    },

    validateImport: csv => {
        const requestUrl = `${URL_API}/api/contact/validate-import`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, csv);
    },

    import: csv => {
        const requestUrl = `${URL_API}/api/contact/import`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, csv);
    },

    getChartData: () => {
        const requestUrl = `${URL_API}/api/contact/chart-data`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl);
    },
};
