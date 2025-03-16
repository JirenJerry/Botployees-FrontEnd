'use client'

// React Imports
import { useState, useEffect, useRef } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// next-auth imports
import { useSession } from 'next-auth/react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Typography from '@mui/material/Typography'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

const BusinessDetails = dynamic(() => import('@/views/apps/business/settings/business-details'))
const PaymentsTab = dynamic(() => import('@views/apps/business/settings/payments'))
const LocationsTab = dynamic(() => import('@views/apps/business/settings/locations'))

const tabContentList = (businessData, handleBusinessDataUpdate, handleFormSubmit) => ({
  'business-details': (
    <BusinessDetails
      initialBusinessData={businessData}
      onBusinessUpdate={handleBusinessDataUpdate}
      handleFormSubmit={handleFormSubmit}
    />
  ),
  payments: <PaymentsTab />,
  locations: <LocationsTab />
})

const errorToast = message => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    toastId: 'dataError'
  })
}

const saveBusinessData = async businessData => {
  try {
    // Implement saving logic here (e.g., API call)
    console.log('Saving business data:', businessData)
    toast.success('Business data updated successfully!')
  } catch (error) {
    errorToast('Failed to save business data!')
  }
}

const createBusiness = async (businessData, session) => {
  try {
    // Extract user information from the session
    const credentials = btoa(`${session?.user?.id}@${session?.user?.businessId}`)

  

    // Perform the API request

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/business`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ business: businessData })
    })

    // Check if the request was successful (status code 201)

    if (res.status === 201) {
      toast.success('Business created successfully!')
    } else {
      const errorData = await res.json()

      errorToast(`API error status: ${res.status} ${errorData}`)
    }
  } catch (error) {
    // Handle errors during the API call

    errorToast('Failed to create business!')
    console.log(error)
  }
}

const Settings = ({ session: initialSession, initialBusinessData }) => {
  // States
  const [activeTab, setActiveTab] = useState('business-details')
  const { data: sessionFromHook, update } = useSession()
  const [session, setSession] = useState(initialSession)
  const [businessData, setBusinessData] = useState(initialBusinessData || {})
  const formSubmitRefs = useRef([])

  const handleFormSubmit = submitHandler => {
    formSubmitRefs.current.push(submitHandler)
  }

  const checkBusiness = session => {
    return !(session?.user?.businessId && businessData)
  }

  const [isDisabled, setIsDisabled] = useState(() => checkBusiness(initialSession))

  useEffect(() => {
    if (sessionFromHook) {
      setSession(sessionFromHook)
      setIsDisabled(checkBusiness(sessionFromHook))
    }
  }, [sessionFromHook])

  // Handle active tab change

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  // Callback function to handle data changes from child components

  const handleBusinessDataChange = updatedData => {
    setBusinessData(prevData => ({
      ...prevData,
      ...updatedData
    }))
  }

  const handleSave = async () => {
    let allFormsValid = true

    const formValidationPromises = formSubmitRefs.current.map(
      submitHandler =>
        new Promise(resolve => {
          submitHandler(
            async formData => {
              // Form is valid, resolve with true

              resolve(true)

              // Form passed validation
            },
            errors => {
              // Form validation failed, resolve with false

              resolve(false)
            }
          )()
        })
    )

    // Wait for all form validation to complete

    const validationResults = await Promise.all(formValidationPromises)

    // Check if all forms are valid

    allFormsValid = validationResults.every(isValid => isValid === true)

    if (allFormsValid) {
      // If all forms are valid, perform the save action

      if (isDisabled) {
        await createBusiness(businessData, session)
      } else {
        await saveBusinessData(businessData)
      }

      await update()
    } else {
      console.error('One or more forms failed validation.')
    }
  }

  useEffect(() => {
    if (session?.user?.businessId && !businessData) {
      errorToast('Failed to load your business data!')
    }
  }, [session, businessData])

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Typography variant='h5' className='mbe-4'>
            Getting Started
          </Typography>
          <CustomTabList orientation='vertical' onChange={handleChange} className='is-full' pill='true'>
            <Tab
              label='Business Details'
              icon={<i className='ri-store-2-line' />}
              iconPosition='start'
              value='business-details'
              className='flex-row justify-start !min-is-full'
            />
            <Tab
              disabled={isDisabled}
              label='Payments'
              icon={<i className='ri-bank-card-line' />}
              iconPosition='start'
              value='payments'
              className='flex-row justify-start !min-is-full'
            />
            <Tab
              disabled={isDisabled}
              label='Locations'
              icon={<i className='ri-map-pin-2-line' />}
              iconPosition='start'
              value='locations'
              className='flex-row justify-start !min-is-full'
            />
          </CustomTabList>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TabPanel value={activeTab} className='p-0'>
                {tabContentList(initialBusinessData, handleBusinessDataChange, handleFormSubmit)[activeTab]}
              </TabPanel>
            </Grid>
            <Grid item xs={12}>
              <div className='flex justify-end gap-4'>
                <Button onClick={handleSave} variant='contained'>
                  {isDisabled ? 'Create Business!' : 'Save Changes'}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default Settings
