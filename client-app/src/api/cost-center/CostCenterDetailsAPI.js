import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_COST_CENTER = `cost-center`;

export default {
    fetchCostCenterDetails: id => {
        const requestUrl = `jory/cost-center/${id}`;

        return getAxiosInstance().get(requestUrl, {
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

        return getAxiosInstance().post(requestUrl, costCenter);
    },

    updateCostCenter: costCenter => {
        const requestUrl = `${URL_COST_CENTER}/${costCenter.id}`;

        return getAxiosInstance().post(requestUrl, costCenter);
    },

    deleteCostCenter: id => {
        const requestUrl = `${URL_COST_CENTER}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },
};
