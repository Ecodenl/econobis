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

    createContactsFromImport: selectedImportsNew => {
        // console.log('ContactToImportsAPI - selectedImportsNew');
        // console.log(selectedImportsNew);
        const requestUrl = `${URL_API}/api/contact-to-imports/createContactsFromImport`;

        return axiosInstance
            .post(requestUrl, { selectedImportsNew: selectedImportsNew })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateContactsFromImport: selectedContactsUpdate => {
        // console.log('ContactToImportsAPI - selectedContactsUpdate');
        // console.log(selectedContactsUpdate);
        const requestUrl = `${URL_API}/api/contact-to-imports/updateContactsFromImport`;

        return axiosInstance
            .post(requestUrl, { selectedContactsUpdate: selectedContactsUpdate })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
    updateContactMatches: () => {
        const requestUrl = `${URL_API}/api/contact/update-contact-matches`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};