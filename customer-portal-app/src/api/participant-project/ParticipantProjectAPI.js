import axiosInstance from '../default-setup/AxiosInstance';

export default {
    createParticipantProject: registerValues => {
        const requestUrl = `/project/participant/create`;

        return axiosInstance.post(requestUrl, registerValues);
    },

    show: id => {
        const requestUrl = `/project/participant/${id}`;

        return axiosInstance.get(requestUrl);
    },
};
