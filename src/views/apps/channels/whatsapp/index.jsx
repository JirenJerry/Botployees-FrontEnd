// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import TwoFactorAuthenticationCard from './FacebookWhatsAppAuth'


const WhatsApp = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
      <TwoFactorAuthenticationCard />
      </Grid>
   
    </Grid>
  )
}

export default WhatsApp
