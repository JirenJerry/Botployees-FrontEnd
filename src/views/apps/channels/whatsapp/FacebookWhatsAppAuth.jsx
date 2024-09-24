'use client'

import React, { useEffect } from 'react'

import Card from '@mui/material/Card'

import Button from '@mui/material/Button'

import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'

import Link from '@components/Link'

import useFacebookSDK from '@/utils/facebookSDK'


const FacebookWhatsAppAuth = () => {
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID // Your actual Facebook App ID

  // Initialize the Facebook SDK
  useFacebookSDK(appId)

  useEffect(() => {
    // Re-render the Facebook button after SDK is loaded
    if (window.FB) {
      window.FB.XFBML.parse() // Parses any Facebook elements, rendering the login button
    }
  }, [])

  return (
    <Card>
      <CardHeader title='Authorize Facebook for WhatsApp Business' />
      <CardContent className='flex flex-col items-start gap-6'>
        <div className='flex flex-col gap-4'>
          <Typography>You need to authorize our Facebook app to access your WhatsApp Business account.</Typography>
          <Typography>
            This will enable us to send messages, manage your WhatsApp Business settings, and ensure a smooth
            integration with your Facebook business page.<br></br>
            <Link className='text-primary'>Learn more about WhatsApp Business API integration.</Link>
          </Typography>
        </div>

        {/* Facebook Login Button */}
       
        <div
          className='fb-login-button'
          data-width='100'
          data-config_id={process.env.NEXT_PUBLIC_FACEBOOK_CONFIGURATION_ID}
          data-size='medium'
          data-button-type='login_with'
          data-layout='default'
          data-auto-logout-link='false'
          data-use-continue-as='false'
        ></div>

        {/* Alternatively, using a Material UI button for other actions */}
      
      </CardContent>
    </Card>
  )
}

export default FacebookWhatsAppAuth
