'use client'

// React Imports
import { useState, useEffect } from 'react'

// next-auth imports
import { useSession } from 'next-auth/react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

const Settings = ({ session: initialSession, tabContentList }) => {
  // States
  const [activeTab, setActiveTab] = useState('business-details')
  const { data: sessionFromHook, update } = useSession()
  const [session, setSession] = useState(initialSession)

  const checkBusiness = (session) => {
    
    
    return !session?.user?.businessId
  }

  const [isDisabled, setIsDisabled] = useState(() => checkBusiness(initialSession))

  useEffect(() => {
    if (sessionFromHook) {
      setSession(sessionFromHook)
      setIsDisabled(checkBusiness(sessionFromHook))
    }
  }, [sessionFromHook])

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  const handleSave = async () => {
    await update()
    setIsDisabled(checkBusiness(sessionFromHook))
  }

  

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
                {tabContentList[activeTab]}
              </TabPanel>
            </Grid>
            <Grid item xs={12}>
              <div className='flex justify-end gap-4'>
                <Button variant='outlined' color='secondary'>
                  Discard
                </Button>
                <Button onClick={handleSave} variant='contained'>
                  Save Changes
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
