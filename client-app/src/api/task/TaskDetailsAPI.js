import axiosInstance from '../default-setup/AxiosInstance';

const URL_TASK = `${URL_API}/api/task`;

export default {
    fetchTaskDetails: id => {
        const requestUrl = `${URL_TASK}/${id}`;

        return axiosInstance.get(requestUrl);
    },

    newTask: task => {
        const requestUrl = URL_TASK;

        return axiosInstance.post(requestUrl, task);
    },

    updateTask: task => {
        const requestUrl = `${URL_TASK}/${task.id}`;

        return axiosInstance.post(requestUrl, task);
    },

    duplicateTask: id => {
        const requestUrl = `${URL_TASK}/${id}/duplicate`;

        return axiosInstance.post(requestUrl);
    },

    deleteTask: id => {
        const requestUrl = `${URL_TASK}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    deleteBulkTasks: ids => {
        const requestUrl = `${URL_TASK}/bulk-delete`;

        return axiosInstance.post(requestUrl, { ids: ids });
    },

    updateBulkTasks: (ids, values) => {
        const requestUrl = `${URL_TASK}/bulk-update`;

        return axiosInstance.post(requestUrl, { ids: ids, ...values });
    },

    storeTaskProperty: (id, data) => {
        const requestUrl = `${URL_API}/api/task/${id}/properties`;

        return axiosInstance.post(requestUrl, data);
    },
    updateTaskProperty: (id, data) => {
        const requestUrl = `${URL_API}/api/task-property-value/${id}`;

        return axiosInstance.post(requestUrl, data);
    },

    uploadTaskFile: (id, file) => {
        const requestUrl = `${URL_TASK}/${id}/attachments`;

        return axiosInstance.post(requestUrl, file);
    },

    downloadAttachment: id => {
        const requestUrl = `${URL_API}/api/task-attachment/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },
};
