import { call, put, takeEvery } from 'redux-saga/effects';

const apiUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';

function getApi() {
  // replace with axios
  return fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

function* fetchConversions(action) {
  try {
    const conversions = yield call(getApi);
    yield put({ type: 'GET_CONVERSIONS_SUCCESS', conversions: conversions });
  } catch (e) {
    yield put({ type: 'GET_CONVERSIONS_FAILED', message: e.message });
  }
}

function* conversionSaga() {
  yield takeEvery('GET_CONVERSIONS_REQUESTED', fetchConversions);
}

export default conversionSaga;
