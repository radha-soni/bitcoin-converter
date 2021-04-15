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
    minWidth: 120,
    width: '300px',
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
    marginBottom: '20px',
  },
  value: {
    color: '#202124',
    fontFamily: 'Google Sans,arial,sans-serif',
    fontSize: '36px',
    fontWeight: 'normal',
    wordBreak: 'break-all',
    lineHeight: '1.2',
    marginTop: '20px',
  },
  converterContainer: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
  },
  options: {
    '& .MuiSelect-selectMenu': {
      margin: '20px 0',
    },
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

  return (
    <div className={classes.converterContainer}>
      <Typography className={classes.title}>1 Bitcoin Equals</Typography>
      <FormControl variant='outlined' className={classes.formControl}>
        <Select native onChange={handleChange}>
          {codes &&
            codes.map((code) => (
              <option
                key={code}
                aria-label={code}
                value={code}
                className={classes.options}
              >
                {' '}
                {conversions.bpi[code].description}{' '}
              </option>
            ))}
        </Select>
      </FormControl>
      <Typography className={classes.value}>
        {code &&
          `${conversions.bpi[code].rate} ${conversions.bpi[code].description}`}
      </Typography>
    </div>
  );
};

export default Converter;
