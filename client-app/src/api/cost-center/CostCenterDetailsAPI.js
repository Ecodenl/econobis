import axiosInstance from '../default-setup/AxiosInstance';
import axios from 'axios';

const URL_COST_CENTER = `cost-center`;

export default {
    fetchCostCenterDetails: id => {
        const requestUrl = `jory/cost-center/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'description', 'twinfieldCostCenterCode'],
                },
            },
        });
    },

    newCostCenter: costCenter => {
        const requestUrl = URL_COST_CENTER;

        costCenter.jory = JSON.stringify({
            fld: ['id'],
        });

        return axiosInstance.post(requestUrl, costCenter);
    },

    updateCostCenter: costCenter => {
        const requestUrl = `${URL_COST_CENTER}/${costCenter.id}`;

        return axiosInstance.post(requestUrl, costCenter);
    },

    deleteCostCenter: id => {
        const requestUrl = `${URL_COST_CENTER}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },
};
