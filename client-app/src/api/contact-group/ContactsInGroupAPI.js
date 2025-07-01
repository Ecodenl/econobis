import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchContactsInGroup: (contactGroupId, filters, sorts, pagination) => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroupId}/contacts/grid`;

        return getAxiosInstance()
            .get(requestUrl, {
                params: {
                    contactGroupId: contactGroupId,
                    filters: JSON.stringify(filters),
                    sorts: JSON.stringify(sorts),
                    limit: pagination.limit,
                    offset: pagination.offset,
                },
            })
            .then(response => response)
            .catch(error => {
                console.log(error);
            });
    },

    deleteContactInGroup: (contactGroup, id) => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup}/contacts/remove/${id}`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    updateContactInGroup: (contactGroup, id, memberToGroupSince) => {
        const URL_CONTACT_GROUP = `${getApiUrl()}/api/contact-group`;
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup}/contacts/update/${id}`;

        return getAxiosInstance()
            .post(requestUrl, memberToGroupSince)
            .then(response => response.data.data)
            .catch(error => error.response);
    },
};
