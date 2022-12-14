import axiosInstance from '../default-setup/AxiosInstance';

const BASE_URL = `${URL_API}/api/contact`;

export default {
    fetchContactAvailabilitiesByWeek: (contactId, startOfWeek) => {
        return axiosInstance.get(`${BASE_URL}/${contactId}/availability/by-week`, {
            params: {
                startOfWeek: startOfWeek,
            },
        }).then(payload => {
            return payload.data;
        });
    },

    updateContactAvailabilities: (contactId, data) => {
        return axiosInstance.post(`${BASE_URL}/${contactId}/availability`, data);
    },

    copyAvailabilities: (contactId, data) => {
        return axiosInstance.post(`${BASE_URL}/${contactId}/availability/copy-weeks`, data);
    },
};
