import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchPortalFreeFieldsPages: (filters, sorts, pagination) => {
        const requestUrl = `${URL_API}/api/portal-free-fields-pages/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },
    fetchPortalFreeFieldsPageDetails: id => {
        const requestUrl = `${URL_API}/api/portal-free-fields-page/${id}`;

        return axiosInstance.get(requestUrl).then(response => {
            return response.data.data;
        });
    },

    // fetchPortalFreeFieldsFields: (filters, sorts, pagination) => {
    //     const requestUrl = `${URL_API}/api/portal-free-fields/grid`;
    //
    //     return axiosInstance.get(requestUrl, {
    //         params: {
    //             filters: JSON.stringify(filters),
    //             sorts: JSON.stringify(sorts),
    //             limit: pagination.limit,
    //             offset: pagination.offset,
    //         },
    //     });
    // },
    //
    deletePortalFreeFieldsPage: id => {
        const requestUrl = `${URL_API}/api/portal-free-fields-page/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    newPortalFreeFieldsPage: portalFreeFieldsPage => {
        const requestUrl = `${URL_API}/api/portal-free-fields-page`;

        return axiosInstance
            .post(requestUrl, portalFreeFieldsPage)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updatePortalFreeFieldsPage: portalFreeFieldsPage => {
        return axiosInstance.post(
            `${URL_API}/api/portal-free-fields-page/${portalFreeFieldsPage.id}/update`,
            portalFreeFieldsPage
        );
    },

    // fetchPortalFreeFieldsFieldRecords: (table, recordId) => {
    //     const requestUrl = `${URL_API}/api/free-fields-field-records/get-values`;
    //
    //     return axiosInstance
    //         .get(requestUrl, {
    //             params: {
    //                 table: table,
    //                 recordId: recordId,
    //             },
    //         })
    //         .then(response => response.data);
    // },
    //
    // updatePortalFreeFieldsFieldRecords: (data, recordId) => {
    //     const requestUrl = `${URL_API}/api/free-fields-field-records/update-values`;
    //     return axiosInstance.post(requestUrl, { data: { records: data, recordId: recordId } });
    // },
};
