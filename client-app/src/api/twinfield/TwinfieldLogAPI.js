import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchTwinfieldLogs: (filters, sorts, pagination) => {
        const requestUrl = `jory/twinfield-log`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'invoiceId',
                        'contactId',
                        'messageText',
                        'messageType',
                        'userId',
                        'isError',
                        'createdAt',
                        'updatedAt',
                        'twinfieldLogMessageTypeName',
                    ],
                    srt: sorts,
                    flt: filters,
                    ...pagination,
                },
                meta: ['total'],
            },
        });
    },
};
