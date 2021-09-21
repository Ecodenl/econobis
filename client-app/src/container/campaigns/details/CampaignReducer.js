export const INITIAL_STATE = {
    result: {},
    isLoading: true,
    hasError: false,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'updateIsLoading':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'updateResult':
            return {
                ...state,
                result: action.payload,
            };
        case 'updateHasErrors':
            return {
                ...state,
                hasError: action.payload,
            };
        default:
            return INITIAL_STATE;
    }
};
