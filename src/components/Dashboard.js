import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chart from './Chart';
import Converter from './Converter';

const useStyles = makeStyles((theme) => ({
  dashboard: {
    // width: '100%',
    display: 'flex',
    // justifyContent: 'center',
    margin: '150px 50px 0 50px',
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
