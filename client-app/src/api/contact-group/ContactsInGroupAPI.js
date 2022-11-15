import axiosInstance from '../default-setup/AxiosInstance';

const URL_CONTACT_GROUP = `${URL_API}/api/contact-group`;

export default {
    fetchContactsInGroup: contactGroup => {
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup}/contacts/grid`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
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
