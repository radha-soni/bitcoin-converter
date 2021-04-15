import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversions } from '../store/actions/conversions';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontFamily: 'Roboto,HelveticaNeue,Arial,sans-serif',
    fontWeight: 'normal',
    fontSize: '16px',
    color: '#70757a',
    lineHeight: 1.2,
    textAlign: 'left',
    marginBottom: '4px',
  },
  value: {
    color: '#202124',
    fontFamily: 'Google Sans,arial,sans-serif',
    fontSize: '36px',
    fontWeight: 'normal',
    wordBreak: 'break-all',
    lineHeight: '1.2',
  },
  converterContainer: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

const Converter = ({ code, setCode }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { conversions, loading, error } = useSelector(
    (state) => state.conversions
  );
  const [codes, setCodes] = useState(null);

  useEffect(() => {
    dispatch(getConversions());
  }, []);

  useEffect(() => {
    if (conversions) {
      console.log(conversions);
      setCodes(Object.keys(conversions.bpi));
    }
  }, [conversions]);

  useEffect(() => {
    if (codes) {
      setCode(codes[0]);
    }
  }, [codes]);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  return loading ? (
    <h1>Loading..</h1>
  ) : (
    code && (
      <div className={classes.converterContainer}>
        <Typography className={classes.title}>1 Bitcoin Equals</Typography>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel htmlFor='outlined-age-native-simple'>Country</InputLabel>
          <Select native onChange={handleChange} label='Country'>
            {codes.map((code) => (
              <option key={code} aria-label={code} value={code}>
                {' '}
                {conversions.bpi[code].description}{' '}
              </option>
            ))}
          </Select>
        </FormControl>
        <Typography
          className={classes.value}
        >{`${conversions.bpi[code].rate} ${conversions.bpi[code].description}`}</Typography>
      </div>
    )
  );
};

export default Converter;
