import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchContactToImports: (filters, sorts, pagination, selectAllNew, selectAllUpdate) => {
        const requestUrl = `${URL_API}/api/contact-to-imports/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
                selectAllNew,
                selectAllUpdate,
            },
        });
    },

    peekContactToImportsWithStatus: status => {
        const requestUrl = `${URL_API}/api/contact-to-imports/peek-with-status`;

        return axiosInstance.get(requestUrl, {
            params: {
                status: JSON.stringify(status),
            },
        });
    },

    getContactFromContactToImport: contactToImport => {
        const requestUrl = `${URL_API}/api/contact-to-imports/${contactToImport}/getContactToImport`;

        return axiosInstance.get(requestUrl);
    },

    setContactToImportStatus: (contactToImport, status, contactForImport) => {
        const requestUrl = `${URL_API}/api/contact-to-imports/${contactToImport}/setContactToImportStatus/${status}/contactForImport/${contactForImport}`;

        return axiosInstance.get(requestUrl);
    },
};