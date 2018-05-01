export default function (state= [], action) {
    switch (action.type) {
        case 'FETCH_PRODUCTS_SUCCESS':
            return [
                ...state,
                ...action.products.data.data
            ];
        case 'CLEAR_PRODUCTS':
            return state.products = [];
        case 'DELETE_PRODUCT_SUCCESS':
            return state.filter((product) => product.id !== action.id);
        default:
            return state;
    }
}