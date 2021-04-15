import { all } from '@redux-saga/core/effects';
import conversionSaga from './conversionSaga';

export default function* rootSaga() {
  yield all([conversionSaga()]);
}
