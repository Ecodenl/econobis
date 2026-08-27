import getAxiosInstance from '../default-setup/AxiosInstance';

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
        'usesWfNewTask',
        'emailTemplateIdWfNewTask',
    ],
    rlt: {
        emailTemplateWorkflowCompletedTask: [],
        emailTemplateWorkflowExpiredTask: [],
        emailTemplateWorkflowNewTask: [],
    },
};

export default {
    fetchTaskTypeDetails: id => {
        const requestUrl = `jory/task-type/${id}`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: defaultFields,
            },
        });
    },

    updateTaskType: taskType => {
        const requestUrl = `${URL_TASK_TYPE}/${taskType.id}`;
        return getAxiosInstance().post(requestUrl, taskType, {
            params: {
                jory: defaultFields,
            },
        });
    },
};
