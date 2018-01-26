export default function (state= { isLoading: false }, action) {
    switch (action.type) {
    case 'FETCH_AUDIT_TRAIL_LOADING':
        return {
            ...state,
            isLoading: true,
        };
    case 'FETCH_AUDIT_TRAIL_SUCCESS':
        return {
            data: action.auditTrail.data.data,
            meta: {
                total: action.auditTrail.data.meta.total,
            },
            isLoading: false,
        };
    case 'CLEAR_AUDIT_TRAIL':
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