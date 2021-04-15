import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversionHistory } from '../store/actions/conversionHistory';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    width: '50%',
  },
}));

const Chart = ({ code }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { conversionHistory, loading, error } = useSelector(
    (state) => state.conversionHistory
  );

  const getFormattedDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${
      date < 10 ? '0' + date : date
    }`;
  };

  useEffect(() => {
    if (code) {
      const dateObj = new Date();
      const today = getFormattedDate(dateObj);
      const todayMinusSixty = getFormattedDate(
        new Date(dateObj.getTime() - 60 * 24 * 60 * 60 * 1000)
      );

      dispatch(
        getConversionHistory({
          currency: code,
          start: todayMinusSixty,
          end: today,
        })
      );
    }
  }, [code]);

  useEffect(() => {
    console.log(conversionHistory);
  }, [conversionHistory]);

  return (
    <div className={classes.chartContainer}>
      {loading ? (
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
      )}
    </div>
  );
};

export default Chart;
