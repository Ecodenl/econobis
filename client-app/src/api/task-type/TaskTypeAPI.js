import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchTaskTypes: () => {
        const requestUrl = `jory/task-type`;

        return getAxiosInstance().get(requestUrl, {
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
                        'usesWfNewTask',
                        'emailTemplateIdWfNewTask',
                    ],
                },
            },
        });
    },
};
