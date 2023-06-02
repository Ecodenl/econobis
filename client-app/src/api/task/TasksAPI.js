import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchTasks: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_API}/api/task/grid/tasks`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    fetchNotes: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_API}/api/task/grid/notes`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    getAmountActive: () => {
        const requestUrl = `${URL_API}/api/task/amount-active`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchTasksCalendarEvents: (startDate, endDate) => {
        const requestUrl = `${URL_API}/api/task/calendar`;

        return axiosInstance.get(requestUrl, {
            params: {
                startDate,
                endDate,
            },
        });
    },

    peekTasks: () => {
        const requestUrl = `${URL_API}/api/task/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekTasksForContacts: (contactIds) => {
        const requestUrl = `${URL_API}/api/task/peek`;

        return axiosInstance
            .get(requestUrl, {
                params: {
                    contactIds: JSON.stringify(contactIds),
                }
            })
            .then(function(response) {
                return response.data.data;
            });
    },
};
