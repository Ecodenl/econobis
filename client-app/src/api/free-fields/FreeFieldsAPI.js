import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchFreeFields: (filters, sorts, pagination) => {
        const requestUrl = `${URL_API}/api/free-fields/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    deleteFreeFieldsField: id => {
        const requestUrl = `${URL_API}/api/free-fields/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    newFreeField: freeField => {
        const requestUrl = `${URL_API}/api/free-fields`;

        return axiosInstance
            .post(requestUrl, freeField)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchFreeFieldDetails: id => {
        const requestUrl = `${URL_API}/api/free-fields/${id}`;

        return axiosInstance.get(requestUrl).then(response => {
            return response.data;
        });
    },

    updateFreeField: freeField => {
        return axiosInstance.post(`${URL_API}/api/free-fields/${freeField.id}/update`, freeField);
    },

    listFreeFieldsTables: () => {
        const requestUrl = `${URL_API}/api/free-fields/free-fields-tables/list`;

        return axiosInstance.get(requestUrl);
    },

    listFreeFieldsFieldFormats: () => {
        const requestUrl = `${URL_API}/api/free-fields/free-fields-field-formats/list`;

        return axiosInstance.get(requestUrl);
    },
};
