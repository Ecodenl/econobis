import getAxiosInstance from '../../default-setup/AxiosInstance';

const URL_FINANCIAL_OVERVIEW_POST = `financial-overview-post`;

export default {
    fetchFinancialOverviewPosts: financialOverviewId => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_POST}/grid`;
        return getAxiosInstance().get(requestUrl, {
            params: {
                financialOverviewId: JSON.stringify(financialOverviewId),
            },
        });
    },

    // deleteFinancialOverviewPost: financialOverviewPostId => {
    //     const requestUrl = `${URL_FINANCIAL_OVERVIEW_POST}/${financialOverviewPostId}/delete`;
    //
    //     return getAxiosInstance().post(requestUrl);
    // },

    download: financialOverviewPostId => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_POST}/${financialOverviewPostId}/download`;

        return getAxiosInstance().get(requestUrl, { responseType: 'blob' });
    },
};
