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
};
