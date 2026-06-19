import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchContactToImports: (filters, sorts, pagination, selectAllNew, selectAllUpdate) => {
        const requestUrl = `${getApiUrl()}/api/contact-to-imports/grid`;

        return getAxiosInstance().get(requestUrl, {
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
        const requestUrl = `${getApiUrl()}/api/contact-to-imports/peek-with-status`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                status: JSON.stringify(status),
            },
        });
    },

    createContactsFromImport: selectedImportsNew => {
        // console.log('ContactToImportsAPI - selectedImportsNew');
        // console.log(selectedImportsNew);
        const requestUrl = `${getApiUrl()}/api/contact-to-imports/createContactsFromImport`;

        return getAxiosInstance()
            .post(requestUrl, { selectedImportsNew: selectedImportsNew })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateContactsFromImport: selectedContactsUpdate => {
        // console.log('ContactToImportsAPI - selectedContactsUpdate');
        // console.log(selectedContactsUpdate);
        const requestUrl = `${getApiUrl()}/api/contact-to-imports/updateContactsFromImport`;

        return getAxiosInstance()
            .post(requestUrl, { selectedContactsUpdate: selectedContactsUpdate })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
    updateContactMatches: () => {
        const requestUrl = `${getApiUrl()}/api/contact/update-contact-matches`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
