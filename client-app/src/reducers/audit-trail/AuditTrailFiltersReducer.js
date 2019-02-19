const filtersReducerDefaultState = {
    model: {
        field: 'model',
        data: '',
    },
    revisionableId: {
        field: 'revisionableId',
        data: '',
    },
    field: {
        field: 'field',
        data: '',
    },
    oldValue: {
        field: 'oldValue',
        data: '',
    },
    newValue: {
        field: 'newValue',
        data: '',
    },
    changedById: {
        field: 'changedById',
        data: '',
    },
    updatedAt: {
        field: 'updatedAt',
        data: '',
    },
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_AUDIT_TRAIL_MODEL':
            return {
                ...state,
                model: {
                    ...state.model,
                    data: action.model,
                },
            };
        case 'SET_FILTER_AUDIT_TRAIL_REVISIONABLE_ID':
            return {
                ...state,
                revisionableId: {
                    ...state.revisionableId,
                    data: action.revisionableId,
                },
            };
        case 'SET_FILTER_AUDIT_TRAIL_FIELD':
            return {
                ...state,
                field: {
                    ...state.field,
                    data: action.field,
                },
            };
        case 'SET_FILTER_AUDIT_TRAIL_OLD_VALUE':
            return {
                ...state,
                oldValue: {
                    ...state.oldValue,
                    data: action.oldValue,
                },
            };
        case 'SET_FILTER_AUDIT_TRAIL_NEW_VALUE':
            return {
                ...state,
                newValue: {
                    ...state.newValue,
                    data: action.newValue,
                },
            };
        case 'SET_FILTER_AUDIT_TRAIL_CHANGED_BY_ID':
            return {
                ...state,
                changedById: {
                    ...state.changedById,
                    data: action.changedById,
                },
            };
        case 'SET_FILTER_AUDIT_TRAIL_UPDATED_AT':
            return {
                ...state,
                updatedAt: {
                    ...state.updatedAt,
                    data: action.updatedAt,
                },
            };
        case 'CLEAR_FILTER_AUDIT_TRAIL':
            return {
                ...state,
                ...filtersReducerDefaultState,
            };
        default:
            return state;
    }
};
