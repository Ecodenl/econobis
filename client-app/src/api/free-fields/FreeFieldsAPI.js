import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchFreeFieldsFields: (filters, sorts, pagination) => {
        const requestUrl = `${getApiUrl()}/api/free-fields-field/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    deleteFreeFieldsField: id => {
        const requestUrl = `${getApiUrl()}/api/free-fields-field/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    newFreeFieldsField: freeFieldsField => {
        const requestUrl = `${getApiUrl()}/api/free-fields-field`;

        return getAxiosInstance()
            .post(requestUrl, freeFieldsField)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchFreeFieldDetails: id => {
        const requestUrl = `${getApiUrl()}/api/free-fields-field/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => {
                return response.data.data;
            });
    },

    updateFreeFieldsField: freeFieldsField => {
        return getAxiosInstance().post(
            `${getApiUrl()}/api/free-fields-field/${freeFieldsField.id}/update`,
            freeFieldsField
        );
    },

    fetchFilterFreeFieldsFieldsContact: () => {
        const requestUrl = `${getApiUrl()}/api/free-fields-field/get-for-filter/contacts`;

        return getAxiosInstance().get(requestUrl);
    },

    fetchFilterFreeFieldsFieldsAddress: () => {
        const requestUrl = `${getApiUrl()}/api/free-fields-field/get-for-filter/addresses`;

        return getAxiosInstance().get(requestUrl);
    },

    peekFreeFieldsTables: () => {
        const requestUrl = `${getApiUrl()}/api/free-fields-field/free-fields-tables/peek`;

        return getAxiosInstance().get(requestUrl);
    },

    peekFreeFieldsFieldFormats: () => {
        const requestUrl = `${getApiUrl()}/api/free-fields-field/free-fields-field-formats/peek`;

        return getAxiosInstance().get(requestUrl);
    },

    fetchFreeFieldsFieldRecords: (table, recordId) => {
        const requestUrl = `${getApiUrl()}/api/free-fields-field-records/get-values`;

        return getAxiosInstance()
            .get(requestUrl, {
                params: {
                    table: table,
                    recordId: recordId,
                },
            })
            .then(response => response.data);
    },

    updateFreeFieldsFieldRecords: (data, recordId) => {
        const requestUrl = `${getApiUrl()}/api/free-fields-field-records/update-values`;
        return getAxiosInstance().post(requestUrl, { data: { records: data, recordId: recordId } });
    },
};
