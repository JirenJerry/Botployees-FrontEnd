// MUI Imports
import Grid from '@mui/material/Grid';

// Component Imports
import FacebookWhatsAppAuth from './FacebookWhatsAppAuth';

const WhatsApp = ({ isButtonDisabled }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FacebookWhatsAppAuth isButtonInitiallyDisabled={isButtonDisabled} />
      </Grid>
    </Grid>
  );
};

export default WhatsApp;
