import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_PROJECT = `project`;

export default {
    fetchProjects: ({ filters, sorts, pagination, filterType }) => {
        const requestUrl = `${URL_PROJECT}/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
                filterType: filterType,
            },
        });
    },

    peekProjects: () => {
        const requestUrl = `${URL_PROJECT}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekDistributionsById: distributionIds => {
        const requestUrl = `distribution/peek-by-ids`;

        return getAxiosInstance()
            .post(requestUrl, { ids: distributionIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekDistributionsKwhById: distributionIds => {
        const requestUrl = `distribution-kwh/peek-by-ids`;

        return getAxiosInstance()
            .post(requestUrl, { ids: distributionIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekDistributionsKwhPartsById: distributionIds => {
        const requestUrl = `distribution-part-kwh/peek-by-ids`;

        return getAxiosInstance()
            .post(requestUrl, { ids: distributionIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekParticipantsById: participantIds => {
        const requestUrl = `project/participant/peek-by-ids`;

        return getAxiosInstance()
            .post(requestUrl, { ids: participantIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getActive: () => {
        const requestUrl = `${URL_PROJECT}/active`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getChartData: id => {
        const requestUrl = `${URL_PROJECT}/chart-status/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getChartContactStatusData: id => {
        const requestUrl = `${URL_PROJECT}/chart-contact-status/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getChartParticipationsData: id => {
        const requestUrl = `${URL_PROJECT}/chart-participations-status/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
