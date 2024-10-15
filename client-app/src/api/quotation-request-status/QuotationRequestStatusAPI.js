import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchQuotationRequestStatus: () => {
        const requestUrl = `jory/quotation-request-status`;

        // todo WM: opschonen velden emailTemplateIdWf, mailCcToCoachWf en numberOfDaysToSendEmail
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
                        'sendEmailReminder',
                    ],
                    srt: ['opportunityActionId', 'order'],
                },
            },
        });
    },
};
