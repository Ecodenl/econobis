import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchByCode: code => {
        const requestUrl = `/project/participant-mutation/by-code/${code}`;

        return axiosInstance.get(requestUrl);
    },
};
