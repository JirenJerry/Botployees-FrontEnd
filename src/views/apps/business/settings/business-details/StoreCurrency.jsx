// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const StoreCurrency = () => {
  // States
  const [currency, setCurrency] = useState('')

  return (
    <Card>
      <CardHeader title='Business currency' subheader='The currency your products/services are sold in.' />
      <CardContent>
        <FormControl fullWidth>
          <InputLabel>Business currency</InputLabel>
          <Select
            label='Business currency'
            name='business-currency'
            variant='outlined'
            value={currency}
            onChange={e => setCurrency(e.target.value)}
          >
            <MenuItem value='USD'>USD</MenuItem>
            <MenuItem value='INR'>INR</MenuItem>
            <MenuItem value='Euro'>Euro</MenuItem>
            <MenuItem value='Pound'>Pound</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  )
}

export default StoreCurrency
