'use client'
import { useState } from 'react'

import Grid from '@mui/material/Grid'

import Profile from './Profile'
import TimeZone from './TimeZone'
import StoreCurrency from './StoreCurrency'

const BusinessDetails = ({ initialBusinessData, onBusinessUpdate, handleFormSubmit }) => {
  // Manage business data state here
  const [businessData, setBusinessData] = useState(initialBusinessData || {})

  // Handle data change from Profile component
  const handleBusinessDataChange = updatedData => {
    setBusinessData(prevData => ({
      ...prevData,
      ...updatedData
    }))
    onBusinessUpdate(updatedData)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Profile
          businessData={businessData}
          handleBusinessDataChange={handleBusinessDataChange}
          onFormSubmit={handleFormSubmit}
        />
      </Grid>
      <Grid item xs={12}>
        <StoreCurrency
          businessData={businessData}
          handleBusinessDataChange={handleBusinessDataChange}
          onFormSubmit={handleFormSubmit}
        />
      </Grid>
      <Grid item xs={12}>
        <TimeZone
          businessData={businessData}
          handleBusinessDataChange={handleBusinessDataChange}
          onFormSubmit={handleFormSubmit}
        />
      </Grid>
    </Grid>
  )
}

export default BusinessDetails
