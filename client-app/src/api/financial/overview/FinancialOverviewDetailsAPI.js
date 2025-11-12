import getAxiosInstance from '../../default-setup/AxiosInstance';

const URL_FINANCIAL_OVERVIEW = `financial-overview`;

export default {
    fetchFinancialOverviewDetails: id => {
        const requestUrl = `jory/financial-overview/${id}`;

        return getAxiosInstance().get(requestUrl, {
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
                        'emailTemplateFinancialOverviewId',
                        'totalFinancialOverviewProjectsInProgress',
                        'totalFinancialOverviewProjectsConcept',
                        'totalFinancialOverviewProjectsDefinitive',
                        'usesInterimFinancialOverviews',
                        'hasInterimFinancialOverviewContacts',
                    ],
                    rlt: {
                        administration: {
                            fld: ['id', 'name'],
                            rlt: { emailTemplateFinancialOverview: { fld: ['name'] } },
                        },
                        documentTemplateFinancialOverview: { fld: ['id', 'name'] },
                        emailTemplateFinancialOverview: { fld: ['id', 'name'] },
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

        return getAxiosInstance().post(requestUrl, financialOverview);
    },

    updateFinancialOverview: financialOverview => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW}/${financialOverview.id}`;

        return getAxiosInstance().post(requestUrl, financialOverview);
    },

    deleteFinancialOverview: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    fetchNewProjectsForFinancialOverview: financialOverview => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW}/${financialOverview.id}/projects-for-financial-overview`;

        return getAxiosInstance().get(requestUrl, financialOverview);
    },

    fetchTotalsInfoFinancialOverview: financialOverview => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW}/${financialOverview.id}/totals-info-financial-overview`;

        return getAxiosInstance().get(requestUrl, financialOverview);
    },
};
