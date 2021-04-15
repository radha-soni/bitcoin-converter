import { combineReducers } from 'redux';
import conversions from './conversions';

const rootReducer = combineReducers({
  conversions: conversions,
});

export default rootReducer;
