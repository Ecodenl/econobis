import axiosInstance from '../../default-setup/AxiosInstance';
import axios from 'axios';

const URL_FINANCIAL_OVERVIEW_PROJECT = `financial-overview-project`;

export default {
    fetchFinancialOverviewProjects: financialOverviewId => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_PROJECT}/grid`;
        return axiosInstance.get(requestUrl, {
            params: {
                financialOverviewId: JSON.stringify(financialOverviewId),
            },
        });
    },

    fetchFinancialOverviewProjectDetails: id => {
        const requestUrl = `jory/${URL_FINANCIAL_OVERVIEW_PROJECT}/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'projectId',
                        'definitive',
                        'startDate',
                        'endDate',
                        'numberOfParticipantProjects',
                        'totalQuantityStartValue',
                        'totalQuantityEndValue',
                        'bookworthStartValue',
                        'bookworthEndValue',
                        'totalAmountStartValue',
                        'totalAmountEndValue',
                    ],
                    rlt: {
                        financialOverview: {
                            fld: [
                                'id',
                                'description',
                                'administrationId',
                                'year',
                                'definitive',
                                'statusId',
                                'dateProcessed',
                            ],
                            rlt: { administration: { fld: ['id', 'name'] } },
                        },
                        project: {
                            fld: ['id', 'code', 'name'],
                            rlt: { projectType: { fld: ['id', 'codeRef', 'name'] } },
                        },
                        financialOverviewParticipantProjects: {
                            fld: [
                                'id',
                                'participantProjectId',
                                'quantityStartValue',
                                'quantityEndValue',
                                'bookworthStartValue',
                                'bookworthEndValue',
                                'amountStartValue',
                                'amountEndValue',
                            ],
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

    updateFinancialOverviewProject: (financialOverviewProjectId, definitive) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_PROJECT}/${financialOverviewProjectId}`;

        return axiosInstance.post(requestUrl, definitive);
    },

    deleteFinancialOverviewProject: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_PROJECT}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    getCSV: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_PROJECT}/${id}/csv`;

        return axiosInstance.get(requestUrl);
    },
};
