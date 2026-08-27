export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_ADDRESS_DONGLES_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_ADDRESS_DONGLES_SUCCESS':
            return {
                data: action.addressDongles.data.data,
                meta: {
                    total: action.addressDongles.data.meta.total,
                    addressDongleIdsTotal: action.addressDongles.data.meta.addressDongleIdsTotal,
                },
                isLoading: false,
            };
        case 'CLEAR_ADDRESS_DONGLES':
            return {
                ...state,
                data: [],
                meta: {},
                isLoading: false,
            };
        default:
            return state;
    }
}
