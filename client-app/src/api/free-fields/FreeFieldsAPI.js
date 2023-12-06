import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchFreeFieldsFields: (filters, sorts, pagination) => {
        const requestUrl = `${URL_API}/api/free-fields-field/grid`;

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
        const requestUrl = `${URL_API}/api/free-fields-field/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    newFreeFieldsField: freeFieldsField => {
        const requestUrl = `${URL_API}/api/free-fields-field`;

        return axiosInstance
            .post(requestUrl, freeFieldsField)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchFreeFieldDetails: id => {
        const requestUrl = `${URL_API}/api/free-fields-field/${id}`;

        return axiosInstance.get(requestUrl).then(response => {
            return response.data.data;
        });
    },

    updateFreeFieldsField: freeFieldsField => {
        return axiosInstance.post(`${URL_API}/api/free-fields-field/${freeFieldsField.id}/update`, freeFieldsField);
    },

    fetchFilterFreeFieldsFieldsContact: () => {
        const requestUrl = `${URL_API}/api/free-fields-field/get-for-filter/contacts`;

        return axiosInstance.get(requestUrl);
    },

    peekFreeFieldsTables: () => {
        const requestUrl = `${URL_API}/api/free-fields-field/free-fields-tables/peek`;

        return axiosInstance.get(requestUrl);
    },

    peekFreeFieldsFieldFormats: () => {
        const requestUrl = `${URL_API}/api/free-fields-field/free-fields-field-formats/peek`;

        return axiosInstance.get(requestUrl);
    },

    fetchFreeFieldsFieldRecords: (table, recordId) => {
        const requestUrl = `${URL_API}/api/free-fields-field-records/get-values`;

        return axiosInstance
            .get(requestUrl, {
                params: {
                    table: table,
                    recordId: recordId,
                },
            })
            .then(response => response.data);
    },

    updateFreeFieldsFieldRecords: (data, recordId) => {
        const requestUrl = `${URL_API}/api/free-fields-field-records/update-values`;
        return axiosInstance.post(requestUrl, { data: { records: data, recordId: recordId } });
    },
};
