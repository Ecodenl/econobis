import getAxiosInstance from '../../default-setup/AxiosInstance';

const URL_FINANCIAL_OVERVIEW_CONTACT = `financial-overview-contact`;

export default {
    fetchFinancialOverviewContacts: (
        filters,
        sorts,
        pagination,
        financialOverviewId,
        onlyInterimFinancialOverviewContacts,
        onlyEmailFinancialOverviewContacts,
        onlyPostFinancialOverviewContacts
    ) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/grid`;
        return getAxiosInstance().get(requestUrl, {
            params: {
                financialOverviewId: JSON.stringify(financialOverviewId),
                onlyInterimFinancialOverviewContacts: JSON.stringify(onlyInterimFinancialOverviewContacts),
                onlyEmailFinancialOverviewContacts: JSON.stringify(onlyEmailFinancialOverviewContacts),
                onlyPostFinancialOverviewContacts: JSON.stringify(onlyPostFinancialOverviewContacts),
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    fetchFinancialOverviewContactDetails: financialOverviewContactId => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewContactId}/get`;

        return getAxiosInstance().get(requestUrl);
    },
    fetchFinancialOverviewContactForInterim: financialOverviewContactId => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewContactId}/get-for-interim`;

        return getAxiosInstance().get(requestUrl);
    },

    updateFinancialOverviewContactForInterim: (
        financialOverviewContactId,
        emailTemplateFinancialOverviewId,
        documentTemplateFinancialOverviewId
    ) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewContactId}/update-for-interim`;

        return getAxiosInstance().post(requestUrl, {
            emailTemplateFinancialOverviewId,
            documentTemplateFinancialOverviewId,
        });
    },

    getFinancialOverviewContactsForSending: (financialOverviewId, ids, type) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewId}/sending/${type}`;

        return getAxiosInstance().post(requestUrl, { ids: ids });
    },

    sendAll: (financialOverviewId, ids) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewId}/send-all`;

        document.body.style.cursor = 'wait';
        let response = getAxiosInstance().post(requestUrl, { ids: ids }, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    sendAllPost: (financialOverviewId, ids) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewId}/send-all-post`;

        document.body.style.cursor = 'wait';
        let response = getAxiosInstance().post(requestUrl, { ids: ids }, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    sendInterim: financialOverviewContactId => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewContactId}/send-interim`;

        document.body.style.cursor = 'wait';
        let response = getAxiosInstance().post(requestUrl, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    sendInterimPost: financialOverviewContactId => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewContactId}/send-interim-post`;

        document.body.style.cursor = 'wait';
        let response = getAxiosInstance().post(requestUrl, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    download: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${id}/download`;

        return getAxiosInstance().get(requestUrl, { responseType: 'blob' });
    },

    downloadPreview: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${id}}/download-preview`;

        return getAxiosInstance().get(requestUrl, { responseType: 'blob' });
    },

    getEmailPreview: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${id}/email-preview`;

        return getAxiosInstance().get(requestUrl);
    },
};
