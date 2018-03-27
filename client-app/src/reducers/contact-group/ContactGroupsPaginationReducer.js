export default function (state = { page: 0, offset: 0 }, action) {
    switch (action.type) {
    case 'SET_CONTACT_GROUPS_PAGINATION':
        return {
            ...state,
            offset: action.pagination.offset,
            page: action.pagination.page,
        };
    default:
        return state;
    }
}
