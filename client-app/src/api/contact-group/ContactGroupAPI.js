import axios from 'axios';

const URL_CONTACT_GROUP = `${URL_API}/api/contact-group`;

export default {
    fetchContactGroups: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_CONTACT_GROUP}/grid`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    deleteContactGroup: (id) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    fetchGroupsByContact: (contactId) => {
        const requestUrl = `${URL_API}/api/contact/${contactId}/groups`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data)
            .catch((error) => {
                console.log(error);
            },
            );
    },

    addContactToGroup: ({groupId, contactId}) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/contacts/add/${contactId}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    newContactGroup: (contactGroup) => {
        const requestUrl = `${URL_CONTACT_GROUP}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, contactGroup)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateContactGroup: (contactGroup) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, contactGroup)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    fetchContactGroupDetails: (id) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    fetchContactGroup: (id) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    deleteContactFromGroup: (groupId, contactId) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/contacts/remove/${contactId}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    addManyContactsToGroup: (contactIds, groupId) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/contacts/add-many`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, contactIds)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    peekContactGroups: () => {
        const requestUrl = `${URL_API}/api/contact-group/peek`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                    console.log(error);
                }
            );
    },

    peekStaticContactGroups: () => {
        const requestUrl = `${URL_API}/api/contact-group/peek/static`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                    console.log(error);
                }
            );
    },

    getCsv: (groupId) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/csv`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    deleteComposedGroup: ({contactGroupId, contactGroupToDetachId}) => {
        const requestUrl = `${URL_CONTACT_GROUP}/composed/${contactGroupId}/${contactGroupToDetachId}/detach`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    attachComposedGroup: ({contactGroupId, contactGroupToAttachId}) => {
        const requestUrl = `${URL_CONTACT_GROUP}/composed/${contactGroupId}/${contactGroupToAttachId}/attach`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },
};
