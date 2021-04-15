import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversions } from '../store/actions/conversions';
import { getConversionHistory } from '../store/actions/conversionHistory';
import { Line } from 'react-chartjs-2';

const Chart = () => {
  const dispatch = useDispatch();
  // const { conversions, loading, error } = useSelector(
  //   (state) => state.conversions
  // );
  const { conversionHistory, loading, error } = useSelector(
    (state) => state.conversionHistory
  );

  useEffect(() => {
    dispatch(
      getConversionHistory({
        currency: 'EUR',
        start: '2020-09-01',
        end: '2020-12-01',
      })
    );
  }, []);

  useEffect(() => {
    console.log(conversionHistory);
  }, [conversionHistory]);

  return loading ? (
    <h1>Loading..</h1>
  ) : (
    conversionHistory && (
      <Line
        data={{
          labels: Object.keys(conversionHistory.bpi),
          datasets: [
            {
              data: Object.values(conversionHistory.bpi),
              fill: true,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        }}
      />
    )
  );
};

export default Chart;
