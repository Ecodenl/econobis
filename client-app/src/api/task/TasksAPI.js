import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchTasks: ({ filters, sorts, pagination }) => {
        const requestUrl = `${getApiUrl()}/api/task/grid/tasks`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    fetchNotes: ({ filters, sorts, pagination }) => {
        const requestUrl = `${getApiUrl()}/api/task/grid/notes`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    getAmountActive: () => {
        const requestUrl = `${getApiUrl()}/api/task/amount-active`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchTasksCalendarEvents: (startDate, endDate) => {
        const requestUrl = `${getApiUrl()}/api/task/calendar`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                startDate,
                endDate,
            },
        });
    },

    peekTasks: () => {
        const requestUrl = `${getApiUrl()}/api/task/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekTasksForContacts: contactIds => {
        const requestUrl = `${getApiUrl()}/api/task/peek`;

        return getAxiosInstance()
            .get(requestUrl, {
                params: {
                    contactIds: JSON.stringify(contactIds),
                },
            })
            .then(function(response) {
                return response.data.data;
            });
    },
};
