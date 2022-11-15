import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchHousingFiles: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_API}/api/housing-file/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekHousingFiles: () => {
        const requestUrl = `${URL_API}/api/housing-file/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getAmountActive: () => {
        const requestUrl = `${URL_API}/api/housing-file/amount-active`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchHousingFilesByContact: contactId => {
        const requestUrl = `${URL_API}/api/contact/${contactId}/housing-files`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
