import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchQuotationRequestStatus: () => {
        const requestUrl = `jory/quotation-request-status`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'name', 'usesWf', 'order', 'opportunityActionName', 'sendEmailReminder'],
                    srt: ['opportunityActionId', 'order'],
                },
            },
        });
    },
};
