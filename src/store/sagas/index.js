import { all } from '@redux-saga/core/effects';
import conversionHistorySaga from './conversionHistorySaga';
import conversionSaga from './conversionSaga';

export default function* rootSaga() {
  yield all([conversionSaga(), conversionHistorySaga()]);
}
