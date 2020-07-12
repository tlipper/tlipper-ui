import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const DashboardComponent = () => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper>
        <div>
          Yeehaw!
        </div>
      </Paper>
    </Grid>
  )
}

DashboardComponent.propTypes = {
}

export default DashboardComponent
