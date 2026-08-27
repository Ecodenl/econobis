import axiosInstance from '../default-setup/AxiosInstance';
import moment from 'moment';

export default {
    fetchFreeFieldsPage: function(contactId, urlPageRef) {
        const requestUrl = `/portal-free-fields-page/${contactId}/${urlPageRef}`;

        return axiosInstance.get(requestUrl);
    },
    updatePortalFreeFieldsPageValues: function(contactId, portalFreeFieldsPageRecords) {
        const requestUrl = `/portal-free-fields-page-values/${contactId}/update`;

        return axiosInstance.post(requestUrl, portalFreeFieldsPageRecords);
    },
};
