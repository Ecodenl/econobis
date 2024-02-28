import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchQuotationRequestStatus: () => {
        const requestUrl = `jory/quotation-request-status`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'name',
                        'usesWf',
                        'emailTemplateIdWf',
                        'numberOfDaysToSendEmail',
                        'order',
                        'mailCcToCoachWf',
                        'opportunityActionName',
                    ],
                },
            },
        });
    },
};
