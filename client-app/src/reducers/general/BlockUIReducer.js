export default function (state = { blocked: false }, action) {
  switch(action.type) {
      case 'BLOCK_UI':
          return { ...state, blocked: true };
      case 'UNBLOCK_UI':
          return {...state, blocked: false};
  }

  return state;
}