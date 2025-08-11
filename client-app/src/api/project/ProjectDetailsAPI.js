import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_PROJECT = `project`;

export default {
    fetchProject: id => {
        const requestUrl = `${URL_PROJECT}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateProject: (id, data) => {
        const requestUrl = `${URL_PROJECT}/${id}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeProject: data => {
        const requestUrl = `${URL_PROJECT}`;

        return getAxiosInstance().post(requestUrl, data);
    },

    deleteProject: id => {
        const requestUrl = `${URL_PROJECT}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    fetchObligationNumbers: id => {
        const requestUrl = `${URL_PROJECT}/${id}/obligation-numbers`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
