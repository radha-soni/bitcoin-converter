import * as type from '../types';

const initialState = {
  conversionHistory: null,
  loading: false,
  error: null,
};

export default function conversionHistory(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case type.GET_CONVERSION_HISTORY_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_CONVERSION_HISTORY_SUCCESS:
      console.log('Success');
      return {
        ...state,
        loading: false,
        conversionHistory: action.conversionHistory,
      };
    case type.GET_CONVERSION_HISTORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
