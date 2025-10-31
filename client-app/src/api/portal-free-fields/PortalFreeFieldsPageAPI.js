import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchPortalFreeFieldsPages: (filters, sorts, pagination) => {
        const requestUrl = `${getApiUrl()}/api/portal-free-fields-pages/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },
    fetchPortalFreeFieldsPageDetails: id => {
        const requestUrl = `${getApiUrl()}/api/portal-free-fields-page/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => {
                return response.data.data;
            });
    },

    peekFreeFieldsContacts: pageId => {
        const requestUrl = `${getApiUrl()}/api/portal-free-fields-page/free-fields-contacts/${pageId}/peek-contacts`;

        return getAxiosInstance().get(requestUrl);
    },

    deletePortalFreeFieldsPage: id => {
        const requestUrl = `${getApiUrl()}/api/portal-free-fields-page/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    newPortalFreeFieldsPage: portalFreeFieldsPage => {
        const requestUrl = `${getApiUrl()}/api/portal-free-fields-page`;

        return getAxiosInstance()
            .post(requestUrl, portalFreeFieldsPage)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updatePortalFreeFieldsPage: portalFreeFieldsPage => {
        return getAxiosInstance().post(
            `${getApiUrl()}/api/portal-free-fields-page/${portalFreeFieldsPage.id}/update`,
            portalFreeFieldsPage
        );
    },

    // fetchPortalFreeFieldsFieldRecords: (table, recordId) => {
    //     const requestUrl = `${getApiUrl()}/api/free-fields-field-records/get-values`;
    //
    //     return getAxiosInstance()
    //         .get(requestUrl, {
    //             params: {
    //                 table: table,
    //                 recordId: recordId,
    //             },
    //         })
    //         .then(response => response.data);
    // },
    //

    createPortalFreeFieldsField: payload => {
        const requestUrl = `${getApiUrl()}/api/portal-free-fields-page-field`;

        return getAxiosInstance().post(requestUrl, payload);
    },
    updatePortalFreeFieldsField: (recordId, payload) => {
        const requestUrl = `${getApiUrl()}/api/portal-free-fields-page-field/${recordId}`;

        return getAxiosInstance().post(requestUrl, payload);
    },
    deletePortalFreeFieldsField: recordId => {
        const requestUrl = `${getApiUrl()}/api/portal-free-fields-page-field/${recordId}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    // updatePortalFreeFieldsFieldRecords: (data, recordId) => {
    //     const requestUrl = `${getApiUrl()}/api/free-fields-field-records/update-values`;
    //     return getAxiosInstance().post(requestUrl, { data: { records: data, recordId: recordId } });
    // },
};
