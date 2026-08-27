import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchContactGroups: ({ filters, sorts, pagination }) => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    deleteContactGroup: id => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    fetchGroupsByContact: contactId => {
        const requestUrl = `${getApiUrl()}/api/contact/${contactId}/groups`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    addContactToGroup: ({ groupId, contactId }) => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/contacts/add/${contactId}`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    newContactGroup: contactGroup => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}`;

        return getAxiosInstance()
            .post(requestUrl, contactGroup)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateContactGroup: contactGroup => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup.id}`;

        return getAxiosInstance()
            .post(requestUrl, contactGroup)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchContactGroupDetails: id => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchContactGroup: id => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteContactFromGroup: (groupId, contactId) => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/contacts/remove/${contactId}`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    addManyContactsToGroup: (contactIds, groupId) => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/contacts/add-many`;

        return getAxiosInstance()
            .post(requestUrl, contactIds)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    peekContactGroups: () => {
        const requestUrl = `${getApiUrl()}/api/contact-group/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekActiveContactGroups: () => {
        const requestUrl = `${getApiUrl()}/api/contact-group/peek/active`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekStaticContactGroups: () => {
        const requestUrl = `${getApiUrl()}/api/contact-group/peek/static`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekStaticActiveContactGroups: () => {
        const requestUrl = `${getApiUrl()}/api/contact-group/peek/static/active`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getCsv: groupId => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/csv`;

        return getAxiosInstance().get(requestUrl);
    },

    getExcelExportGroupReport: () => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/excel/group-report`;

        return getAxiosInstance().get(requestUrl, { responseType: 'blob' });
    },

    deleteComposedGroup: ({ contactGroupId, contactGroupToDetachId }) => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/composed/${contactGroupId}/${contactGroupToDetachId}/detach`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    attachComposedGroup: ({ contactGroupId, contactGroupToAttachId }) => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/composed/${contactGroupId}/${contactGroupToAttachId}/attach`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    deleteComposedExceptGroup: ({ contactGroupId, contactGroupToDetachId }) => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/composed/${contactGroupId}/${contactGroupToDetachId}/detach/except`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    attachComposedExceptGroup: ({ contactGroupId, contactGroupToAttachId }) => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/composed/${contactGroupId}/${contactGroupToAttachId}/attach/except`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    syncLapostaList: id => {
        const requestUrl = `contact-group/${id}/sync-laposta-list`;

        return getAxiosInstance().get(requestUrl);
    },

    deActivateLapostaList: id => {
        const requestUrl = `contact-group/${id}/deactivate-laposta-list`;

        return getAxiosInstance().get(requestUrl);
    },
};
