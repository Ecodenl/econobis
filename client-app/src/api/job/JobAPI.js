import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    getLastJobs: () => {
        const URL_JOB = `${getApiUrl()}/api/jobs`;
        const requestUrl = `${URL_JOB}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
