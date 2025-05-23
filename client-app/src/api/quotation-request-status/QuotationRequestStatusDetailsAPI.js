import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_QUOTATION_REQUEST_STATUS = `quotation-request-status`;

const defaultFields = {
    fld: ['id', 'name', 'usesWf', 'order', 'sendEmailReminder'],
};

export default {
    fetchQuotationRequestStatusDetails: id => {
        const requestUrl = `jory/quotation-request-status/${id}`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: defaultFields,
            },
        });
    },

    updateQuotationRequestStatus: quotationRequestStatus => {
        const requestUrl = `${URL_QUOTATION_REQUEST_STATUS}/${quotationRequestStatus.id}`;
        return getAxiosInstance().post(requestUrl, quotationRequestStatus, {
            params: {
                jory: defaultFields,
            },
        });
    },
};
