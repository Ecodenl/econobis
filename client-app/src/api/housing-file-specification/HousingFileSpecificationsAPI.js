import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchHousingFileSpecifications: ({ filters, extraFilters, sorts, pagination }) => {
        const requestUrl = `${getApiUrl()}/api/housing-file-specification/grid`;

        return getAxiosInstance().get(requestUrl, {
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
        const requestUrl = `${getApiUrl()}/api/housing-file-specification/campaign/${campaignId}/create-opportunities`;

        return getAxiosInstance()
            .post(requestUrl, { ids: specificationIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    createQuotationRequestsFromSpecificationsList: (specificationIds, organisationOrCoachId) => {
        const requestUrl = `${getApiUrl()}/api/housing-file-specification/contact/${organisationOrCoachId}/create-quotation-requests`;

        return getAxiosInstance()
            .post(requestUrl, { ids: specificationIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    getExcelSpecifications: ({ filters, extraFilters, sorts }) => {
        const requestUrl = `${getApiUrl()}/api/housing-file-specification/excel-specifications`;
        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
            responseType: 'blob',
        });
    },
};
