import axiosInstance from '../default-setup/AxiosInstance';

const URL_TASK_TYPE = `task-type`;

const defaultFields = {
    fld: [
        'id',
        'name',
        'usesWfCompletedTask',
        'emailTemplateIdWfCompletedTask',
        'numberOfDaysToSendEmailCompletedTask',
        'usesWfExpiredTask',
        'emailTemplateIdWfExpiredTask',
    ],
    rlt: { emailTemplateWorkflowCompletedTask: [], emailTemplateWorkflowExpiredTask: [] },
};

export default {
    fetchTaskTypeDetails: id => {
        const requestUrl = `jory/task-type/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: defaultFields,
            },
        });
    },

    updateTaskType: taskType => {
        const requestUrl = `${URL_TASK_TYPE}/${taskType.id}`;
        return axiosInstance.post(requestUrl, taskType, {
            params: {
                jory: defaultFields,
            },
        });
    },
};
