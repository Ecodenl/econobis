import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchHousingFileLogs: (filters, sorts, pagination) => {
        const requestUrl = `jory/housing-file-log`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'housingFileId',
                        'messageText',
                        'messageType',
                        'userId',
                        'isError',
                        'createdAt',
                        'updatedAt',
                        'housingFileLogMessageTypeName',
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
