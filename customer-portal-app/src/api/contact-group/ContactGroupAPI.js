import axiosInstance from '../default-setup/AxiosInstance';

export default {
    // fetchContactGroups: ({ filters, sorts, pagination }) => {
    fetchContactGroups: () => {
        const requestUrl = `/contact-groups`;

        return axiosInstance.get(requestUrl
            // , {
            //     params: {
            //         filters: JSON.stringify(filters),
            //         sorts: JSON.stringify(sorts),
            //         limit: pagination.limit,
            //         offset: pagination.offset,
            //     },
            // }
        );
    },
};
