import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchProjects: function() {
        const requestUrl = `/jory/project`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'name', 'dateStartRegistrations', 'dateEndRegistrations'],
                },
            },
        });
    },

    fetchProject: function(id) {
        const requestUrl = `/jory/project/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'name',
                        'description',
                        'dateStartRegistrations',
                        'dateEndRegistrations',
                        'dateEndRegistrations',
                        'minParticipations',
                        'maxParticipations',
                        'totalParticipations',
                        'participationWorth',
                    ],
                },
            },
        });
    },
};
