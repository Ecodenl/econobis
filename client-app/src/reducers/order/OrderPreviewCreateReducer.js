export default function (state = [], action) {
    switch (action.type) {
        case 'ORDER_PREVIEW_CREATE':
            return {
                ...action.data,
            };
        case 'CLEAR_ORDER_PREVIEW_CREATE':
            return state = [];

        default:
            return state;
    }
}