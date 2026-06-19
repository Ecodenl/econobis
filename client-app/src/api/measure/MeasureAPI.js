import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchMeasureGrid: () => {
        const URL_MEASURE = `${getApiUrl()}/api/measure`;
        const requestUrl = `${URL_MEASURE}/grid`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchMeasure: id => {
        const URL_MEASURE = `${getApiUrl()}/api/measure`;
        const requestUrl = `${URL_MEASURE}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateMeasure: (id, data) => {
        const URL_MEASURE = `${getApiUrl()}/api/measure`;
        const requestUrl = `${URL_MEASURE}/${id}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeFaq: (measureId, data) => {
        const URL_MEASURE = `${getApiUrl()}/api/measure`;
        const requestUrl = `${URL_MEASURE}/${measureId}/faq`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteFaq: id => {
        const URL_MEASURE = `${getApiUrl()}/api/measure`;
        const requestUrl = `${URL_MEASURE}/faq/${id}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateFaq: faq => {
        const URL_MEASURE = `${getApiUrl()}/api/measure`;
        const requestUrl = `${URL_MEASURE}/faq/${faq.id}/update`;

        return getAxiosInstance()
            .post(requestUrl, faq)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    attachSupplier: (measureId, organisationId) => {
        const URL_MEASURE = `${getApiUrl()}/api/measure`;
        const requestUrl = `${URL_MEASURE}/${measureId}/supplier/${organisationId}/attach`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    detachSupplier: (measureId, organisationId) => {
        const URL_MEASURE = `${getApiUrl()}/api/measure`;
        const requestUrl = `${URL_MEASURE}/${measureId}/supplier/${organisationId}/detach`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    associateOpportunity: (measureId, opportunityId) => {
        const URL_MEASURE = `${getApiUrl()}/api/measure`;
        const requestUrl = `${URL_MEASURE}/${measureId}/opportunity/${opportunityId}/associate`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    peekMeasures: () => {
        const URL_MEASURE = `${getApiUrl()}/api/measure`;
        const requestUrl = `${URL_MEASURE}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
