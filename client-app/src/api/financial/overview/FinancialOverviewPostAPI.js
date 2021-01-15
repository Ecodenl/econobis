import axiosInstance from '../../default-setup/AxiosInstance';
import axios from 'axios';

const URL_FINANCIAL_OVERVIEW_POST = `financial-overview-post`;

export default {
    fetchFinancialOverviewPosts: financialOverviewId => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_POST}/grid`;
        return axiosInstance.get(requestUrl, {
            params: {
                financialOverviewId: JSON.stringify(financialOverviewId),
            },
        });
    },

    // deleteFinancialOverviewPost: financialOverviewPostId => {
    //     const requestUrl = `${URL_FINANCIAL_OVERVIEW_POST}/${financialOverviewPostId}/delete`;
    //
    //     return axiosInstance.post(requestUrl);
    // },

    download: financialOverviewPostId => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_POST}/${financialOverviewPostId}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },
};
