import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

const BASE_URL = `${getApiUrl()}/api/contact`;

export default {
    fetchContactAvailabilitiesByWeek: (contactId, startOfWeek) => {
        return getAxiosInstance()
            .get(`${BASE_URL}/${contactId}/availability/by-week`, {
                params: {
                    startOfWeek: startOfWeek,
                },
            })
            .then(payload => {
                return payload.data;
            });
    },

    updateContactAvailabilities: (contactId, data) => {
        return getAxiosInstance().post(`${BASE_URL}/${contactId}/availability`, data);
    },

    copyAvailabilities: (contactId, data) => {
        return getAxiosInstance().post(`${BASE_URL}/${contactId}/availability/copy-weeks`, data);
    },

    fetchDistrictAvailabilitiesByWeek: ({ districtId, startOfWeek }) => {
        return getAxiosInstance()
            .get(`${getApiUrl()}/api/district/${districtId}/availability/by-week`, {
                params: {
                    startOfWeek,
                },
            })
            .then(payload => {
                return payload.data;
            });
    },
};
