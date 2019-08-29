import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchProjects: function() {
        const requestUrl = `/jory/project`;

        return axiosInstance.get(requestUrl);
    },
};
