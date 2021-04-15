import * as type from '../types';

export function getConversions(conversions) {
  return {
    type: type.GET_CONVERSIONS_REQUESTED,
    payload: conversions,
  };
}
