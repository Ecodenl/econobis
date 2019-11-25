import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchTaskTypes: () => {
        const requestUrl = `jory/task-type`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'name',
                        'usesWfCompletedTask',
                        'emailTemplateIdWfCompletedTask',
                        'numberOfDaysToSendEmailCompletedTask',
                        'usesWfExpiredTask',
                        'emailTemplateIdWfExpiredTask',
                    ],
                },
            },
        });
    },
};
