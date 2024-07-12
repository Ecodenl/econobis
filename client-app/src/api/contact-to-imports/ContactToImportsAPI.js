import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchContactToImports: (filters, sorts, pagination) => {
        const requestUrl = `${URL_API}/api/contact-to-imports/grid`;

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
