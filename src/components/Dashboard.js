import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chart from './Chart';
import Converter from './Converter';

const useStyles = makeStyles(() => ({
  dashboard: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 40,
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [code, setCode] = useState(null);

  return (
    <div className={classes.dashboard}>
      <Converter code={code} setCode={setCode} />
      <Chart code={code} />
    </div>
  );
}

export default Dashboard;
