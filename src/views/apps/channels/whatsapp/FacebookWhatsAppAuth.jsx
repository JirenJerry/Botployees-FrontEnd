'use client'
import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

import Card from '@mui/material/Card'

import Button from '@mui/material/Button'

import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'

import { toast } from 'react-toastify'

import Link from '@components/Link'

import useFacebookSDK from '@/utils/facebookSDK'

import 'react-toastify/dist/ReactToastify.css'

const FacebookWhatsAppAuth = () => {
  const { data: session } = useSession() // Get user session data
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID // Your actual Facebook App ID
  const configId = process.env.NEXT_PUBLIC_FACEBOOK_CONFIGURATION_ID // Configuration ID

  const [phoneNumberId, setPhoneNumberId] = useState(null)
  const [wabaId, setWabaId] = useState(null)
  const [responseCode, setResponseCode] = useState(null) // State for responseCode
  const [isButtonDisabled, setIsButtonDisabled] = useState(false) // State to manage button's disabled state
  const [buttonText, setButtonText] = useState('Authorize With Facebook') // State for button text

  // Initialize the Facebook SDK

  useFacebookSDK(appId)

  // MessageEvent listener for storing session info

  useEffect(() => {
    const messageHandler = event => {
      if (event.origin !== 'https://www.facebook.com' && event.origin !== 'https://web.facebook.com') {
        return
      }

      try {
        const data = JSON.parse(event.data)

        if (data.type === 'WA_EMBEDDED_SIGNUP') {
          // If user finishes the Embedded Signup flow

          if (data.event === 'FINISH') {
            const { phone_number_id, waba_id } = data.data

            setPhoneNumberId(phone_number_id)
            setWabaId(waba_id)
            console.log('Phone number ID:', phone_number_id, 'WhatsApp business account ID:', waba_id)
          } else if (data.event === 'CANCEL') {
            const { current_step } = data.data

            console.warn('Cancelled at:', current_step)
          } else if (data.event === 'ERROR') {
            const { error_message } = data.data

            console.error('Error:', error_message)
          }
        }
      } catch (error) {
        console.log('Invalid message data', error)
      }
    }

    window.addEventListener('message', messageHandler)

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('message', messageHandler)
  }, [])

  // Callback after Facebook login to exchange the code for access token
  const fbLoginCallback = response => {
    if (response.authResponse) {
      const code = response.authResponse.code

      setResponseCode(code) // Set the responseCode state
      setIsButtonDisabled(true) // Disable the button when login starts
    }
  }

  // Function to create channel when all required data is available
  const createChannel = async channelData => {
    if (!session || !session.user) {
      console.error('User session is not available')

      return
    }

    try {
      const businessId = session.user.businessId // Assuming businessId is part of session data
      const userId = session.user.id // Assuming userId is part of session data

      const credentials = btoa(`${userId}@${businessId}`)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/assistants/channels/temp`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${credentials}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ channel: channelData })
      })
     
      if (res.status === 201) {
        // On success, update the button text and keep it disabled
        setButtonText('Authenticated With Facebook!')
        setIsButtonDisabled(true)
      } else {
        const data = await res.json().catch(() => null)
       
        const errorMessage = data?.error?.message || 'Failed to create channel'
        
        throw new Error(errorMessage)
     
      }

      const responseData = await res.json()

      console.log(responseData)
    } catch (error) {
      setIsButtonDisabled(false) // Re-enable the button if there's an error

      throw error
    }
  }

  // Effect to check when phoneNumberId, wabaId, and responseCode are available
  useEffect(() => {
    if (phoneNumberId && wabaId && responseCode) {
      const channelData = {
        channelName: 'WhatsApp',
        responseCode: responseCode,
        WABA_ID: wabaId,
        phone_number_id: phoneNumberId
      }

      toast.promise(createChannel(channelData), {
        pending: 'Creating Channel',
        success: 'WhatsApp Channel Created!',
        error: {
          render({ data }) {
      
            
            return data.message
            
          }
        }
      })
    }
  }, [phoneNumberId, wabaId, responseCode]) // Effect runs when any of these values change

  // Function to launch Facebook Embedded WhatsApp Signup flow
  const launchWhatsAppSignup = () => {
    if (window.FB) {
      window.FB.login(fbLoginCallback, {
        config_id: configId,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: '',
          sessionInfoVersion: '2'
        }
      })
    }
  }

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

        {/* Launch the embedded WhatsApp signup flow */}
        <div className='w-full flex justify-end'>
          <Button
            variant='contained'
            size='large'
            onClick={launchWhatsAppSignup}
            className='bg-blue-600 text-white'
            disabled={isButtonDisabled} // Disable button based on state
          >
            {buttonText} {/* Update button text based on state */}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default FacebookWhatsAppAuth
