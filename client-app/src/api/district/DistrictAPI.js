import axiosInstance from '../default-setup/AxiosInstance';

const BASE_URL = 'district';

export default {
    fetchDistricts: () => {
        return axiosInstance.get(BASE_URL).then(response => {
            return response.data;
        });
    },

    fetchDistrictDetails: id => {
        return axiosInstance.get(`${BASE_URL}/${id}`).then(response => {
            return response.data;
        });
    },

    fetchDistrictCalendarItems: (districtId, startDate, endDate) => {
        return axiosInstance.get(`${BASE_URL}/${districtId}/calendar-items`, {
            params: {
                startDate,
                endDate,
            }
        }).then(response => {
            return response.data;
        });
    },

    newDistrict: district => {
        return axiosInstance.post(BASE_URL, district).then(response => {
            return response.data;
        });
    },

    updateDistrict: district => {
        return axiosInstance.post(`${BASE_URL}/${district.id}`, district);
    },

    deleteDistrict: district => {
        return axiosInstance.post(`${BASE_URL}/${district.id}/delete`);
    },

    detachDistrictCoach: ({ districtId, coachId }) => {
        return axiosInstance.post(`${BASE_URL}/${districtId}/coaches/${coachId}/detach`);
    },

    attachDistrictCoach: ({ districtId, coachId }) => {
        return axiosInstance.post(`${BASE_URL}/${districtId}/coaches/${coachId}/attach`);
    }
};
