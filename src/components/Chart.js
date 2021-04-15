import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversions } from '../store/actions/conversions';

const Chart = () => {
  const dispatch = useDispatch();
  const { conversions, loading, error } = useSelector(
    (state) => state.conversions
  );

  useEffect(() => {
    dispatch(getConversions());
  }, []);

  return loading ? (
    <h1>Loading..</h1>
  ) : (
    <h1>
      {conversions &&
        `${conversions.bpi.USD.description}: ${conversions.bpi.USD.rate}`}
    </h1>
  );
};

export default Chart;
