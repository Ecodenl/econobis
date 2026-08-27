import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchAuditTrail: ({ filters, sorts, pagination }) => {
        const requestUrl = `${getApiUrl()}/api/audit-trail/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    fetchAuditTrailModels: () => {
        const requestUrl = `${getApiUrl()}/api/audit-trail/peek-models`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
