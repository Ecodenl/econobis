import axiosInstance from '../default-setup/AxiosInstance';

const URL_MEASURE = `${URL_API}/api/measure`;

export default {
    fetchMeasureGrid: () => {
        const requestUrl = `${URL_MEASURE}/grid`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchMeasure: id => {
        const requestUrl = `${URL_MEASURE}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateMeasure: (id, data) => {
        const requestUrl = `${URL_MEASURE}/${id}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeFaq: (measureId, data) => {
        const requestUrl = `${URL_MEASURE}/${measureId}/faq`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteFaq: id => {
        const requestUrl = `${URL_MEASURE}/faq/${id}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateFaq: faq => {
        const requestUrl = `${URL_MEASURE}/faq/${faq.id}/update`;

        return axiosInstance
            .post(requestUrl, faq)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    attachSupplier: (measureId, organisationId) => {
        const requestUrl = `${URL_MEASURE}/${measureId}/supplier/${organisationId}/attach`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    detachSupplier: (measureId, organisationId) => {
        const requestUrl = `${URL_MEASURE}/${measureId}/supplier/${organisationId}/detach`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    associateOpportunity: (measureId, opportunityId) => {
        const requestUrl = `${URL_MEASURE}/${measureId}/opportunity/${opportunityId}/associate`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    peekMeasures: () => {
        const requestUrl = `${URL_MEASURE}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
