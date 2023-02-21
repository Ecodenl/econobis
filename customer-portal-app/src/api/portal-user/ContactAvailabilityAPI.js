import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchContactAvailabilitiesByWeek: (startOfWeek) => {
        return axiosInstance.get(`portal-user/availability/by-week`, {
            params: {
                startOfWeek: startOfWeek,
            },
        }).then(payload => {
            return payload.data;
        });
    },

    updateContactAvailabilities: (data) => {
        return axiosInstance.post(`portal-user/availability`, data);
    },

    copyAvailabilities: (data) => {
        return axiosInstance.post(`portal-user/availability/copy-weeks`, data);
    },
};
