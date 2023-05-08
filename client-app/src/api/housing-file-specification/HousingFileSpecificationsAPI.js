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

    // createOpportunitiesFromSpecifications: (housingFileId, specificationIds, campaignId) => {
    //     const requestUrl = `${URL_HOUSING_FILE}/${housingFileId}/campaign/${campaignId}/create-opportunities`;
    //
    //     return axiosInstance
    //         .post(requestUrl, { ids: specificationIds })
    //         .then(function(response) {
    //             return response.data;
    //         })
    //         .catch(function(error) {
    //             return error.response;
    //         });
    // },

    getExcel: ({ filters, extraFilters, sorts }) => {
        const requestUrl = `${URL_API}/api/housing-file/excel`;
        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
            responseType: 'blob',
        });
    },

    getExcelSpecifications: ({ filters, extraFilters, sorts }) => {
        const requestUrl = `${URL_API}/api/housing-file/excelspecifications`;
        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
            responseType: 'blob',
        });
    },
};
