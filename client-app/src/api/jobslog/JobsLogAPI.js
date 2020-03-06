import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchJobslogs: () => {
        const requestUrl = `jory/jobslog`;

        return axiosInstance
            .get(requestUrl, {
                params: {
                    jory: {
                        fld: ['id', 'value', 'userId', 'createdAt', 'updatedAt', 'jobCategoryId'],
                    },
                },
            })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
