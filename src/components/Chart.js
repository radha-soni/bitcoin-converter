import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversionHistory } from '../store/actions/conversionHistory';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    width: '60%',
    marginLeft: '50px',
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

  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, '#34a85330');
    gradient.addColorStop(1, '#34a85300');

    return {
      labels: Object.keys(conversionHistory.bpi).map((date) => {
        const dateObj = new Date(date);
        return `${date.slice(-2)} ${dateObj.toLocaleString('default', {
          month: 'short',
        })}`;
      }),
      datasets: [
        {
          label: 'Last 60 days trend',
          lineTension: 0,
          data: Object.values(conversionHistory.bpi),
          fill: true,
          backgroundColor: gradient,
          borderColor: '#34a853',
          pointRadius: 1,
        },
      ],
    };
  };

  return (
    <div className={classes.chartContainer}>
      {loading ? (
        <h1>Loading..</h1>
      ) : (
        conversionHistory && (
          <>
            <p>Last 60 days trend</p>
            <Line
              data={data}
              options={{
                scales: {
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 2,
                        maxRotation: 0,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      gridLines: {
                        color: '#eeeeee',
                      },
                      ticks: {
                        stepSize: 10000,
                        maxRotation: 0,
                      },
                    },
                  ],
                },
                legend: {
                  display: false,
                },
              }}
            />
          </>
        )
      )}
    </div>
  );
};

export default Chart;
