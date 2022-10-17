import axiosInstance from '../default-setup/AxiosInstance';

const URL_JOB = `${URL_API}/api/jobs`;

export default {
    getLastJobs: () => {
        const requestUrl = `${URL_JOB}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
