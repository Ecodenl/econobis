import axiosInstance from '../default-setup/AxiosInstance';

export default {
    addContactToGroup: ( groupId, contactId ) => {
        const requestUrl = `/contact-group/${groupId}/contacts/add/${contactId}`;

        return axiosInstance.post(requestUrl);
    },
};
