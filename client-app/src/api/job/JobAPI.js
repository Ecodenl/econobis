import axios from 'axios';

const URL_JOB = `${URL_API}/api/jobs`;

export default {
    getLastJobs: () => {
        const requestUrl = `${URL_JOB}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
