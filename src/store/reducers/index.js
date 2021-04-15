import { combineReducers } from 'redux';
import conversions from './conversions';
import conversionHistory from './conversionHistory';

const rootReducer = combineReducers({
  conversions: conversions,
  conversionHistory: conversionHistory,
});

export default rootReducer;
