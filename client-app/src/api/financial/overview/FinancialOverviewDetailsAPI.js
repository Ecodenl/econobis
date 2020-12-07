import axiosInstance from '../../default-setup/AxiosInstance';

const URL_FINANCIAL_OVERVIEW = `financial-overview`;
const URL_FINANCIAL_OVERVIEW_PROJECT = `financial-overview-project`;

export default {
    fetchFinancialOverviewDetails: id => {
        const requestUrl = `jory/financial-overview/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'administrationId', 'year', 'definitive'],
                    rlt: {
                        administration: { fld: ['id', 'name'] },
                        financialOverviewProjects: {
                            fld: ['id', 'projectId', 'definitive'],
                            rlt: {
                                project: {
                                    fld: ['id', 'code', 'name'],
                                    rlt: { projectType: { fld: ['id', 'codeRef', 'name'] } },
                                },
                            },
                        },
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

    newFinancialOverviewProject: financialOverviewProject => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_PROJECT}`;
        financialOverviewProject.jory = JSON.stringify({
            fld: ['id'],
        });

        return axiosInstance.post(requestUrl, financialOverviewProject);
    },
    updateFinancialOverviewProject: financialOverviewProject => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_PROJECT}/${financialOverviewProject.id}`;

        // return axiosInstance.post(requestUrl, financialOverviewProject);
        return axiosInstance
            .post(requestUrl, financialOverviewProject)
            .then(function(response) {
                return null;
            })
            .catch(function(error) {
                console.log('test error');
                console.log(error.response);
                return error.response;
            });
    },

    deleteFinancialOverviewProject: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_PROJECT}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    fetchNewProjectsForFinancialOverview: financialOverview => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW}/${financialOverview.id}/projects-for-financial-overview`;

        return axiosInstance.get(requestUrl, financialOverview);
    },
};
