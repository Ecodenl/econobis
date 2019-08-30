import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchProjects: function() {
        const requestUrl = `/jory/project`;

        return axiosInstance.get(requestUrl);
    },

    fetchProject: function(id) {
        const requestUrl = `/jory/project/${id}`;

        return axiosInstance.get(requestUrl);
    },
};
