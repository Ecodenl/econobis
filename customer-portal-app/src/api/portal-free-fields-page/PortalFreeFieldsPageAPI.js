import axiosInstance from '../default-setup/AxiosInstance';
import moment from 'moment';

export default {
    fetchFreeFieldsPage: function(contactId, urlPageRef) {
        const requestUrl = `/portal-free-fields-page/${contactId}/${urlPageRef}`;

        return axiosInstance.get(requestUrl);
    },
    update: function(contactId, urlPageRef) {
        console.log('hier api call voor update');
        return true;
        // const requestUrl = `/portal-free-fields-page/${contactId}/${urlPageRef}`;
        //
        // return axiosInstance.get(requestUrl);
    },
};
