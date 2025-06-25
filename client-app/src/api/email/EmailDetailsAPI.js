import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/LoginRouteFields';

export default {
    fetchEmail: id => {
        return getAxiosInstance()
            .get(`${getApiUrl()}/api/email-details/${id}`)
            .then(response => response.data);
    },
};
