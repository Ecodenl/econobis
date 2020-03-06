import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchJobslogs: () => {
        const requestUrl = `jory/jobs-log`;

        return axiosInstance
            .get(requestUrl, {
                params: {
                    jory: {
                        fld: ['id', 'value', 'userId', 'createdAt', 'updatedAt', 'jobCategoryId'],
                        srt: ['-createdAt'],
                    },
                },
            })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
