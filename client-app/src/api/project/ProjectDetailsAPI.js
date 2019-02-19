import axiosInstance from '../default-setup/AxiosInstance';

const URL_PROJECT = `project`;

export default {
    fetchProject: id => {
        const requestUrl = `${URL_PROJECT}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateProject: (id, data) => {
        const requestUrl = `${URL_PROJECT}/${id}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeProject: data => {
        const requestUrl = `${URL_PROJECT}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteProject: id => {
        const requestUrl = `${URL_PROJECT}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    fetchObligationNumbers: id => {
        const requestUrl = `${URL_PROJECT}/${id}/obligation-numbers`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
