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

    getContactFromContactToImport: contactToImport => {
        const requestUrl = `${URL_API}/api/contact-to-imports/${contactToImport}/getContactToImport`;

        return axiosInstance.get(requestUrl);
    },

    setContactToImportStatus: (contactToImport, status) => {
        const requestUrl = `${URL_API}/api/contact-to-imports/${contactToImport}/setContactToImportStatus/${status}`;

        return axiosInstance.get(requestUrl);
    },
};
