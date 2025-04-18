export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_CONTACT_GROUPS_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_CONTACT_GROUPS_SUCCESS':
            return {
                data: action.contactGroups.data.data,
                meta: {
                    total: action.contactGroups.data.meta.total,
                    useLaposta: action.contactGroups.data.meta.useLaposta,
                },
                isLoading: false,
            };
        case 'DELETE_CONTACT_GROUP_SUCCESS':
            return {
                ...state,
                data: state.data.filter(contactGroup => contactGroup.id !== action.id),
            };
        case 'CLEAR_CONTACT_GROUPS':
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
