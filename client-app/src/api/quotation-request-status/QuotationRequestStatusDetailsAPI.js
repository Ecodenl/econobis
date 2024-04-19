import axiosInstance from '../default-setup/AxiosInstance';

const URL_QUOTATION_REQUEST_STATUS = `quotation-request-status`;

// todo WM: opschonen velden emailTemplateIdWf, mailCcToCoachWf en numberOfDaysToSendEmail
const defaultFields = {
    fld: ['id', 'name', 'usesWf', 'emailTemplateIdWf', 'numberOfDaysToSendEmail', 'order', 'mailCcToCoachWf'],
    rlt: { emailTemplateWorkflow: [] },
};

export default {
    fetchQuotationRequestStatusDetails: id => {
        const requestUrl = `jory/quotation-request-status/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: defaultFields,
            },
        });
    },

    updateQuotationRequestStatus: quotationRequestStatus => {
        const requestUrl = `${URL_QUOTATION_REQUEST_STATUS}/${quotationRequestStatus.id}`;
        return axiosInstance.post(requestUrl, quotationRequestStatus, {
            params: {
                jory: defaultFields,
            },
        });
    },
};
