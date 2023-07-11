import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchHousingFileSpecifications: ({ filters, extraFilters, sorts, pagination }) => {
        const requestUrl = `${URL_API}/api/housing-file-specification/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    createOpportunitiesFromSpecificationsList: (specificationIds, campaignId) => {
        const requestUrl = `${URL_API}/api/housing-file-specification/campaign/${campaignId}/create-opportunities`;

        return axiosInstance
            .post(requestUrl, { ids: specificationIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    createQuotationRequestsFromSpecificationsList: (specificationIds, organisationOrCoachId) => {
        const requestUrl = `${URL_API}/api/housing-file-specification/contact/${organisationOrCoachId}/create-quotation-requests`;

        return axiosInstance
            .post(requestUrl, { ids: specificationIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    getExcelSpecifications: ({ filters, extraFilters, sorts }) => {
        const requestUrl = `${URL_API}/api/housing-file-specification/excel-specifications`;
        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
            responseType: 'blob',
        });
    },
};
