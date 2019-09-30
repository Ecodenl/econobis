import axiosInstance from '../default-setup/AxiosInstance';
import moment from 'moment';

export default {
    fetchProjects: function() {
        const requestUrl = `/jory/project`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'name', 'dateStartRegistrations', 'dateEndRegistrations'],
                    flt: {
                        and: [
                            { f: 'dateStartRegistrations', o: '<=', d: moment().format('YYYY-MM-DD') },
                            { f: 'dateEndRegistrations', o: '>=', d: moment().format('YYYY-MM-DD') },
                        ],
                    },
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
