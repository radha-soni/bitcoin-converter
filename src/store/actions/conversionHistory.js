import * as type from '../types';

export function getConversionHistory(conversionHistory) {
  return {
    type: type.GET_CONVERSION_HISTORY_REQUESTED,
    payload: conversionHistory,
  };
}
