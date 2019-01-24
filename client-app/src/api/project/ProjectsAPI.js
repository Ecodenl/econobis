import axiosInstance from '../default-setup/AxiosInstance';

const URL_PROJECT = `production-project`;

export default {
    fetchProjects: ({ pagination }) => {
        const requestUrl = `${URL_PROJECT}/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    peekProjects: () => {
        const requestUrl = `${URL_PROJECT}/peek`;

        return axiosInstance
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
        URL_API;
        return axiosInstance
            .post(requestUrl, { ids: distributionIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekParticipantsById: participantIds => {
        const requestUrl = `production-project/participant/peek-by-ids`;

        return axiosInstance
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

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getChartData: id => {
        const requestUrl = `${URL_PROJECT}/chart-status/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getChartContactStatusData: id => {
        const requestUrl = `${URL_PROJECT}/chart-contact-status/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getChartParticipationsData: id => {
        const requestUrl = `${URL_PROJECT}/chart-participations-status/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
