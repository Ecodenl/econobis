export default function (state= {}, action) {
  switch(action.type) {
    case 'AUTH_USER':
      return { ...state, authenticated: true };
    case 'UNAUTH_USER':
      return {...state, authenticated: false};
  }

  return state;
}