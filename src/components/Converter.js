import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversions } from '../store/actions/conversions';

const Converter = () => {
  const dispatch = useDispatch();
  const { conversions, loading, error } = useSelector(
    (state) => state.conversions
  );

  useEffect(() => {
    dispatch(getConversions());
  }, []);

  useEffect(() => {
    console.log(conversions);
  }, [conversions]);

  return loading ? <h1>Loading..</h1> : conversions && <h1>Loaded</h1>;
};

export default Converter;
