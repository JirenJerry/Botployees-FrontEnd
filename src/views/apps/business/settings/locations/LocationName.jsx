'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'

import FormControl from '@mui/material/FormControl'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'

const LocationName = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    language: [],
    date: null,
    phoneNumber: '',
    username: '',
    email: '',
    password: '',
    isPasswordShown: false,
    confirmPassword: '',
    setIsConfirmPasswordShown: false,
    twitter: '',
    facebook: '',
    google: '',
    linkedin: '',
    instagram: '',
    quora: ''
  })
  
  return (
    <Card>
      <CardHeader title='Business Locations' />

      <CardContent className='flex flex-col items-start gap-4'>
        <FormControl fullWidth>
          <InputLabel>Location</InputLabel>
          <Select
            label='Location'
            value={formData.language}
            onChange={e => setFormData({ ...formData, language: e.target.value })}
          >
            <MenuItem value='English'>English</MenuItem>
            <MenuItem value='French'>French</MenuItem>
            <MenuItem value='Spanish'>Spanish</MenuItem>
            <MenuItem value='Portuguese'>Portuguese</MenuItem>
            <MenuItem value='Italian'>Italian</MenuItem>
            <MenuItem value='German'>German</MenuItem>
            <MenuItem value='Arabic'>Arabic</MenuItem>
          </Select>
        </FormControl>
        <Divider flexItem />
        <TextField fullWidth label='Location Name' placeholder='Empire Hub' />
      
      </CardContent>
    </Card>
  )
}

export default LocationName
