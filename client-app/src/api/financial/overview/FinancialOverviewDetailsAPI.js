import axiosInstance from '../../default-setup/AxiosInstance';

const URL_FINANCIAL_OVERVIEW = `financial-overview`;

export default {
    fetchFinancialOverviewDetails: id => {
        const requestUrl = `jory/financial-overview/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'description',
                        'administrationId',
                        'year',
                        'definitive',
                        'statusId',
                        'dateProcessed',
                        'documentTemplateFinancialOverviewId',
                        'totalFinancialOverviewProjectsInProgress',
                        'totalFinancialOverviewProjectsConcept',
                        'totalFinancialOverviewProjectsDefinitive',
                    ],
                    rlt: {
                        administration: { fld: ['id', 'name'] },
                        documentTemplateFinancialOverview: { fld: ['id', 'name'] },
                    },
                },
            },
        });
    },

    newFinancialOverview: financialOverview => {
        const requestUrl = URL_FINANCIAL_OVERVIEW;
        financialOverview.jory = JSON.stringify({
            fld: ['id'],
        });

        return axiosInstance.post(requestUrl, financialOverview);
    },

    updateFinancialOverview: financialOverview => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW}/${financialOverview.id}`;

        return axiosInstance.post(requestUrl, financialOverview);
    },

    deleteFinancialOverview: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    fetchNewProjectsForFinancialOverview: financialOverview => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW}/${financialOverview.id}/projects-for-financial-overview`;

        return axiosInstance.get(requestUrl, financialOverview);
    },

    fetchTotalsInfoFinancialOverview: financialOverview => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW}/${financialOverview.id}/totals-info-financial-overview`;

        return axiosInstance.get(requestUrl, financialOverview);
    },
};
