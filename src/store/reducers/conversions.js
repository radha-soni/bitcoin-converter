import * as type from '../types';

const initialState = {
  conversions: null,
  loading: false,
  error: null,
};

export default function conversions(state = initialState, action) {
  switch (action.type) {
    case type.GET_CONVERSIONS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_CONVERSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        conversions: action.conversions,
      };
    case type.GET_CONVERSIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
