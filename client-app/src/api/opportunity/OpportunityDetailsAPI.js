import axiosInstance from '../default-setup/AxiosInstance';

const URL_OPPORTUNITY = `${URL_API}/api/opportunity`;

export default {
    fetchOpportunity: id => {
        const requestUrl = `${URL_OPPORTUNITY}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateOpportunity: (id, data) => {
        const requestUrl = `${URL_OPPORTUNITY}/${id}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeOpportunity: data => {
        const requestUrl = `${URL_OPPORTUNITY}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteOpportunity: id => {
        const requestUrl = `${URL_OPPORTUNITY}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    deleteBulkOpportunities: ids => {
        const requestUrl = `${URL_OPPORTUNITY}/bulk-delete`;

        return axiosInstance.post(requestUrl, { ids: ids });
    },

    updateBulkOpportunities: (ids, values) => {
        const requestUrl = `${URL_OPPORTUNITY}/bulk-update`;

        return axiosInstance.post(requestUrl, { ids: ids, ...values });
    },

    updateOpportunityEvaluation: (id, data) => {
        const requestUrl = `${URL_OPPORTUNITY}/evaluation/${id}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },
};
