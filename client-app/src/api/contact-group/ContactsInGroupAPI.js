import axiosInstance from '../default-setup/AxiosInstance';

const URL_CONTACT_GROUP = `${URL_API}/api/contact-group`;

export default {
    fetchContactsInGroup: contactGroup => {
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup}/contacts/grid`;

        return axiosInstance
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchContactsInGroupPaginated: (contactGroup, pagination, filters) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup}/contacts/grid`;
        console.log('00000');
        console.log(JSON.stringify(filters));
        return axiosInstance
            .get(requestUrl, {
                params: {
                    limit: pagination.limit,
                    offset: pagination.offset,
                    filters: JSON.stringify(filters),
                },
            })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteContactInGroup: (contactGroup, id) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup}/contacts/remove/${id}`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    updateContactInGroup: (contactGroup, id, memberToGroupSince) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup}/contacts/update/${id}`;

        return axiosInstance
            .post(requestUrl, memberToGroupSince)
            .then(response => response.data.data)
            .catch(error => error.response);
    },
};
