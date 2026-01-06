import getAxiosInstance from '../default-setup/AxiosInstance';

const BASE_URL = 'district';

export default {
    fetchDistricts: () => {
        return getAxiosInstance()
            .get(BASE_URL)
            .then(response => {
                return response.data;
            });
    },

    fetchDistrictDetails: id => {
        return getAxiosInstance()
            .get(`${BASE_URL}/${id}`)
            .then(response => {
                return response.data;
            });
    },

    fetchDistrictCalendarItems: (districtId, startDate, endDate) => {
        return getAxiosInstance()
            .get(`${BASE_URL}/${districtId}/calendar-items`, {
                params: {
                    startDate,
                    endDate,
                },
            })
            .then(response => {
                return response.data;
            });
    },

    peekDistrictsForTeam: () => {
        return getAxiosInstance()
            .get(`${BASE_URL}/peek`)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newDistrict: district => {
        return getAxiosInstance()
            .post(BASE_URL, district)
            .then(response => {
                return response.data;
            });
    },

    updateDistrict: district => {
        return getAxiosInstance().post(`${BASE_URL}/${district.id}`, district);
    },

    deleteDistrict: district => {
        return getAxiosInstance().post(`${BASE_URL}/${district.id}/delete`);
    },

    detachDistrictCoach: ({ districtId, coachId }) => {
        return getAxiosInstance().post(`${BASE_URL}/${districtId}/coaches/${coachId}/detach`);
    },

    attachDistrictCoach: ({ districtId, coachId }) => {
        return getAxiosInstance().post(`${BASE_URL}/${districtId}/coaches/${coachId}/attach`);
    },
};
