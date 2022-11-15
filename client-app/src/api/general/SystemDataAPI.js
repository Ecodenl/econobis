import axiosInstance from '../default-setup/AxiosInstance';

export default {
    getSystemData() {
        const requestUrl = `${URL_API}/api/system-data`;

        return axiosInstance.get(requestUrl);
    },
};
