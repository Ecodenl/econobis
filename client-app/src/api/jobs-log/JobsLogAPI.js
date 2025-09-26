import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchJobslogs: (filters, sorts, pagination) => {
        const requestUrl = `jory/jobs-log`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'value', 'userId', 'createdAt', 'updatedAt', 'jobCategoryId', 'jobCategoryName'],
                    srt: sorts,
                    flt: filters,
                    ...pagination,
                },
                meta: ['total'],
            },
        });
    },
};
