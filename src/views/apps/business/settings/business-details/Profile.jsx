// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'

const Profile = () => {
  return (
    <Card>
      <CardHeader title='Profile' />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
            <TextField fullWidth label='Name' placeholder="Kamilo's" />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth label='Phone' placeholder='+(123) 456-7890' />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth label='Contact email' placeholder='johndoe@kamilos.com' />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth rows={4} multiline label='Description' placeholder='Barber shop based on...' />
          </Grid>
         
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Profile
