export default function(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'FETCH_INTAKES_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'FETCH_INTAKES_SUCCESS':
            return {
                data: action.intakes.data.data,
                meta: {
                    total: action.intakes.data.meta.total,
                    intakeIdsTotal: action.intakes.data.meta.intakeIdsTotal,
                },
                isLoading: false,
            };
        case 'CLEAR_INTAKES':
            return {
                ...state,
                data: [],
                meta: {},
                isLoading: false,
            };

        case 'SET_CHECKED_INTAKE':
            return {
                ...state,
                data: state.data.map(intake => {
                    if (intake.id === action.id) {
                        return {
                            ...intake,
                            checked: !intake.checked,
                        };
                    } else {
                        return intake;
                    }
                }),
            };
        case 'SET_CHECKED_INTAKE_ALL':
            return {
                ...state,
                data: state.data.map(intake => {
                    return {
                        ...intake,
                        checked: action.checkedValue,
                    };
                }),
            };
        default:
            return state;
    }
}
