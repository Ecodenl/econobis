export default function(state = {}, action) {
    switch (action.type) {
        case 'AUTH_USER':
            return { ...state, authenticated: true };
        case 'UNAUTH_USER':
            return { ...state, authenticated: false };
        case 'FETCH_TOKEN_LOADED_SUCCESS':
            localStorage.setItem('access_token', action.token.data.access_token);
            localStorage.setItem('refresh_token', action.token.data.refresh_token);
    }

    return state;
}
