import { call, put, takeEvery } from 'redux-saga/effects';

function getApi({ currency, start, end }) {
  // replace with axios
  return fetch(
    `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${start}&end=${end}`
  )
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

function* fetchConversionHistory(action) {
  try {
    const conversionHistory = yield call(getApi, action.payload);
    yield put({
      type: 'GET_CONVERSION_HISTORY_SUCCESS',
      conversionHistory: conversionHistory,
    });
  } catch (e) {
    yield put({ type: 'GET_CONVERSION_HISTORY_FAILED', message: e.message });
  }
}

function* conversionHistorySaga() {
  yield takeEvery('GET_CONVERSION_HISTORY_REQUESTED', fetchConversionHistory);
}

export default conversionHistorySaga;
