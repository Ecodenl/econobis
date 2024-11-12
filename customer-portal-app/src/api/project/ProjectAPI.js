import axiosInstance from '../default-setup/AxiosInstance';
import moment from 'moment';

export default {
    fetchProjects: function() {
        const requestUrl = `/jory/project`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'name', 'dateStartRegistrations', 'dateEndRegistrations'],
                    flt: {
                        and: [
                            { f: 'dateStartRegistrations', o: '<=', d: moment().format('YYYY-MM-DD') },
                            { f: 'dateEndRegistrations', o: '>=', d: moment().format('YYYY-MM-DD') },
                        ],
                    },
                    rlt: {
                        administration: { fld: ['id', 'name'] },
                    },
                },
            },
        });
    },

    fetchProject: function(id) {
        const requestUrl = `/jory/project/${id}`;
        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'name',
                        'description',
                        'dateStartRegistrations',
                        'dateEndRegistrations',
                        'minParticipations',
                        'maxParticipations',
                        'totalParticipations',
                        'participationWorth',
                        'currentBookWorth',
                        'amountOfLoanNeeded',
                        'minAmountLoan',
                        'maxAmountLoan',
                        'isSceProject',
                        'checkPostalcodeLink',
                        'postalcodeLink',
                        'linkAgreeTerms',
                        'linkProjectInfo',
                        'linkUnderstandInfo',
                        'showQuestionAboutMembership',
                        'useTransactionCostsWithMembership',
                        'usesMollie',
                        'textTransactionCosts',
                        'transactionCostsCodeRef',
                        'transactionCostsAmountMin',
                        'transactionCostsAmountMax',
                        'transactionCostsAmount',
                        'transactionCostsPercentage',
                        'transactionCostsAmount2',
                        'transactionCostsPercentage2',
                        'transactionCostsAmount3',
                        'transactionCostsPercentage3',
                        'allowIncreaseParticipations',
                    ],
                    rlt: {
                        projectType: { fld: ['id', 'codeRef'] },
                        administration: { fld: ['id', 'name', 'portalSettingsLayoutAssigned'] },
                        documentAgreeTerms: { fld: ['id', 'filename'] },
                        documentUnderstandInfo: { fld: ['id', 'filename'] },
                        documentProjectInfo: { fld: ['id', 'filename'] },
                    },
                },
            },
        });
    },

    documentDownload: function(projectId, id) {
        const requestUrl = `/project/${projectId}/document/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },
};
