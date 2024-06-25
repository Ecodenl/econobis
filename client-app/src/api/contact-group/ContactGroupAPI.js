import axiosInstance from '../default-setup/AxiosInstance';

const URL_CONTACT_GROUP = `${URL_API}/api/contact-group`;

export default {
    fetchContactGroups: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_CONTACT_GROUP}/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    deleteContactGroup: id => {
        const requestUrl = `${URL_CONTACT_GROUP}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    fetchGroupsByContact: contactId => {
        const requestUrl = `${URL_API}/api/contact/${contactId}/groups`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    addContactToGroup: ({ groupId, contactId }) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/contacts/add/${contactId}`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    newContactGroup: contactGroup => {
        const requestUrl = `${URL_CONTACT_GROUP}`;

        return axiosInstance
            .post(requestUrl, contactGroup)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateContactGroup: contactGroup => {
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup.id}`;

        return axiosInstance
            .post(requestUrl, contactGroup)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchContactGroupDetails: id => {
        const requestUrl = `${URL_CONTACT_GROUP}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchContactGroup: id => {
        const requestUrl = `${URL_CONTACT_GROUP}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteContactFromGroup: (groupId, contactId) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/contacts/remove/${contactId}`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    addManyContactsToGroup: (contactIds, groupId) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/contacts/add-many`;

        return axiosInstance
            .post(requestUrl, contactIds)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    peekContactGroups: () => {
        const requestUrl = `${URL_API}/api/contact-group/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekActiveContactGroups: () => {
        const requestUrl = `${URL_API}/api/contact-group/peek/active`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekStaticContactGroups: () => {
        const requestUrl = `${URL_API}/api/contact-group/peek/static`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekStaticActiveContactGroups: () => {
        const requestUrl = `${URL_API}/api/contact-group/peek/static/active`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getCsv: groupId => {
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/csv`;

        return axiosInstance.get(requestUrl);
    },

    getExcelExportGroupReport: () => {
        const requestUrl = `${URL_CONTACT_GROUP}/excel/group-report`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },

    deleteComposedGroup: ({ contactGroupId, contactGroupToDetachId }) => {
        const requestUrl = `${URL_CONTACT_GROUP}/composed/${contactGroupId}/${contactGroupToDetachId}/detach`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    attachComposedGroup: ({ contactGroupId, contactGroupToAttachId }) => {
        const requestUrl = `${URL_CONTACT_GROUP}/composed/${contactGroupId}/${contactGroupToAttachId}/attach`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    deleteComposedExceptGroup: ({ contactGroupId, contactGroupToDetachId }) => {
        const requestUrl = `${URL_CONTACT_GROUP}/composed/${contactGroupId}/${contactGroupToDetachId}/detach/except`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    attachComposedExceptGroup: ({ contactGroupId, contactGroupToAttachId }) => {
        const requestUrl = `${URL_CONTACT_GROUP}/composed/${contactGroupId}/${contactGroupToAttachId}/attach/except`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    syncLapostaList: id => {
        const requestUrl = `contact-group/${id}/sync-laposta-list`;

        return axiosInstance.get(requestUrl);
    },

    deActivateLapostaList: id => {
        const requestUrl = `contact-group/${id}/deactivate-laposta-list`;

        return axiosInstance.get(requestUrl);
    },
};
