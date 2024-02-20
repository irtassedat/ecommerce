export const SET_ROLES = "SET_ROLES";
export const SET_CATEGORY = "SET_CATEGORY";
export const CHANGE_THEME = "CHANGE_THEME";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

const global = {
  roles: [],
  categories: [],
  language: "tr",
  theme: "light",
};

export const globalReducer = (state = global, action) => {
  switch (action.type) {
    case SET_ROLES:
      return { ...state, roles: action.payload };

    case SET_CATEGORY:
      return { ...state, categories: action.payload };

    case CHANGE_THEME:
      return { ...state, theme: action.payload };

    case CHANGE_LANGUAGE:
      return { ...state, language: action.payload };

    default:
      return state;
  }
};

