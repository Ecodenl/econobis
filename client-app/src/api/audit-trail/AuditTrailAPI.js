import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchAuditTrail: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_API}/api/audit-trail/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    fetchAuditTrailModels: () => {
        const requestUrl = `${URL_API}/api/audit-trail/peek-models`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
