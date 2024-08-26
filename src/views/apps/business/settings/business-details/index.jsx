'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import Profile from './Profile'

import TimeZone from './TimeZone'
import StoreCurrency from './StoreCurrency'

const BusinessDetails = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Profile />
      </Grid>
      <Grid item xs={12}>
        <StoreCurrency />
      </Grid>
      <Grid item xs={12}>
        <TimeZone />
      </Grid>
  
    
    </Grid>
  )
}

export default BusinessDetails
