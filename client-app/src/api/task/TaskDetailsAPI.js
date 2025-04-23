import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchTaskDetails: id => {
        const URL_TASK = `${getApiUrl()}/api/task`;
        const requestUrl = `${URL_TASK}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newTask: task => {
        const URL_TASK = `${getApiUrl()}/api/task`;
        const requestUrl = URL_TASK;

        return getAxiosInstance().post(requestUrl, task);
    },

    updateTask: task => {
        const URL_TASK = `${getApiUrl()}/api/task`;
        const requestUrl = `${URL_TASK}/${task.id}`;

        return getAxiosInstance().post(requestUrl, task);
    },

    duplicateTask: id => {
        const URL_TASK = `${getApiUrl()}/api/task`;
        const requestUrl = `${URL_TASK}/${id}/duplicate`;

        return getAxiosInstance().post(requestUrl);
    },

    deleteTask: id => {
        const URL_TASK = `${getApiUrl()}/api/task`;
        const requestUrl = `${URL_TASK}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    deleteBulkTasks: ids => {
        const URL_TASK = `${getApiUrl()}/api/task`;
        const requestUrl = `${URL_TASK}/bulk-delete`;

        return getAxiosInstance().post(requestUrl, { ids: ids });
    },

    updateBulkTasks: (ids, values) => {
        const URL_TASK = `${getApiUrl()}/api/task`;
        const requestUrl = `${URL_TASK}/bulk-update`;

        return getAxiosInstance().post(requestUrl, { ids: ids, ...values });
    },

    storeTaskProperty: (id, data) => {
        const requestUrl = `${getApiUrl()}/api/task/${id}/properties`;

        return getAxiosInstance().post(requestUrl, data);
    },
    updateTaskProperty: (id, data) => {
        const requestUrl = `${getApiUrl()}/api/task-property-value/${id}`;

        return getAxiosInstance().post(requestUrl, data);
    },

    uploadTaskFile: (id, file) => {
        const URL_TASK = `${getApiUrl()}/api/task`;
        const requestUrl = `${URL_TASK}/${id}/attachments`;

        return getAxiosInstance().post(requestUrl, file);
    },

    downloadAttachment: id => {
        const requestUrl = `${getApiUrl()}/api/task-attachment/${id}/download`;

        return getAxiosInstance().get(requestUrl, { responseType: 'blob' });
    },
};
