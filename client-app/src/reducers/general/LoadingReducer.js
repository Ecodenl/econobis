export default function(state = { isLoading: false, hasError: false }, action) {
    switch (action.type) {
        case 'IS_LOADING':
            return { isLoading: true, hasError: false };
        case 'IS_LOADING_COMPLETE':
            return { isLoading: false, hasError: false };
        case 'LOADING_ERROR':
            return { isLoading: false, hasError: true };
    }

    return state;
}
