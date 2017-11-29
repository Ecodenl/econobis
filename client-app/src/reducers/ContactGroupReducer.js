export default (state = [], action) => {
    switch (action.type) {
    case 'ADD_CONTACT_TO_GROUP_SUCCESS':
        return state;
    case 'FETCH_CONTACT_GROUPS_SUCCESS':
        return [
            ...state,
            ...action.contactGroups,
        ];
    case 'CLEAR_CONTACT_GROUPS':
        return [];
    case 'DELETE_CONTACT_GROUP_SUCCESS':
        return state.filter((contactGroup) => contactGroup.id !== action.id);
    default:
        return state;
    }
};
