import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchContactsToImport: (filters, sorts, pagination) => {
        const requestUrl = `${URL_API}/api/contacts-to-import/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },
};
