import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchOpportunity: id => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateOpportunity: (id, data) => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/${id}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeOpportunity: data => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteOpportunity: id => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    deleteBulkOpportunities: ids => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/bulk-delete`;

        return getAxiosInstance().post(requestUrl, { ids: ids });
    },

    updateBulkOpportunities: (ids, values) => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/bulk-update`;

        return getAxiosInstance().post(requestUrl, { ids: ids, ...values });
    },

    updateOpportunityEvaluation: (id, data) => {
        const URL_OPPORTUNITY = `${getApiUrl()}/api/opportunity`;
        const requestUrl = `${URL_OPPORTUNITY}/evaluation/${id}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },
};
