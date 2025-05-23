import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchHousingFiles: ({ filters, sorts, pagination }) => {
        const requestUrl = `${getApiUrl()}/api/housing-file/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekHousingFiles: () => {
        const requestUrl = `${getApiUrl()}/api/housing-file/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getAmountActive: () => {
        const requestUrl = `${getApiUrl()}/api/housing-file/amount-active`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchHousingFilesByContact: contactId => {
        const requestUrl = `${getApiUrl()}/api/contact/${contactId}/housing-files`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getExcelHousingFiles: ({ filters, sorts }) => {
        const requestUrl = `${getApiUrl()}/api/housing-file/excel`;
        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
            responseType: 'blob',
        });
    },
};
