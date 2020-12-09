import axiosInstance from '../../default-setup/AxiosInstance';
import axios from 'axios';

const URL_FINANCIAL_OVERVIEW = `financial-overview`;
const URL_FINANCIAL_OVERVIEW_PROJECT = `financial-overview-project`;
const URL_FINANCIAL_OVERVIEW_CONTACT = `financial-overview-contact`;

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

    fetchFinancialOverviewProjectDetails: id => {
        const requestUrl = `jory/financial-overview-project/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'projectId', 'definitive'],
                    rlt: {
                        financialOverview: {
                            fld: ['id', 'administrationId', 'year', 'definitive'],
                            rlt: { administration: { fld: ['id', 'name'] } },
                        },
                        project: {
                            fld: ['id', 'code', 'name'],
                            rlt: { projectType: { fld: ['id', 'codeRef', 'name'] } },
                        },
                        financialOverviewParticipantProjects: {
                            fld: ['id', 'participantProjectId', 'startValue', 'endValue'],
                            rlt: {
                                participantProject: {
                                    fld: ['id', 'contactId'],
                                    rlt: { contact: { fld: ['id', 'fullName'] } },
                                },
                            },
                        },
                    },
                },
            },
        });
    },

    fetchFinancialOverviewContactDetails: (financialOverviewId, contactId) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewId}/${contactId}`;

        return axiosInstance.get(requestUrl);
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

    downloadPreview: (id, contactId) => {
        const requestUrl = `${URL_API}/api/${URL_FINANCIAL_OVERVIEW}/${id}/${contactId}/download-preview`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, { responseType: 'blob' });
    },

    newFinancialOverviewProject: financialOverviewProject => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_PROJECT}`;
        financialOverviewProject.jory = JSON.stringify({
            fld: ['id', 'projectId', 'definitive'],
            rlt: {
                project: {
                    fld: ['id', 'code', 'name'],
                    rlt: { projectType: { fld: ['id', 'codeRef', 'name'] } },
                },
            },
        });

        return axiosInstance.post(requestUrl, financialOverviewProject);
    },
    updateFinancialOverviewProject: financialOverviewProject => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_PROJECT}/${financialOverviewProject.id}`;

        return axiosInstance.post(requestUrl, financialOverviewProject);
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
