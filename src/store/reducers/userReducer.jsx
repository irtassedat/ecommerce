import { SET_USER, CLEAR_USER } from '../userTypes'

const initialState = {
  userInfo: {
    name: "",
    email: "",
    password: "",
    role_id: "",
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, userInfo: action.payload };
    case CLEAR_USER:
      return { ...initialState };
    default:
      return state;
  }
};
