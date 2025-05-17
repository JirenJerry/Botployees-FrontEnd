'use client';

import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

import { toast } from 'react-toastify';

import Link from '@components/Link';
import useFacebookSDK from '@/utils/facebookSDK';
import 'react-toastify/dist/ReactToastify.css';

const FacebookWhatsAppAuth = ({ isButtonInitiallyDisabled = false }) => {
  const { data: session } = useSession();
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const configId = process.env.NEXT_PUBLIC_FACEBOOK_CONFIGURATION_ID;

  const [phoneNumberId, setPhoneNumberId] = useState(null);
  const [wabaId, setWabaId] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [isAuthInProgress, setIsAuthInProgress] = useState(false);
  const [buttonText, setButtonText] = useState('Authorize With Facebook');

  // Initialize the Facebook SDK
  useFacebookSDK(appId);

  // Set button text if already authenticated
  useEffect(() => {
    if (isButtonInitiallyDisabled) {
      setButtonText('Authenticated With Facebook!');
    }
  }, [isButtonInitiallyDisabled]);

  useEffect(() => {
    const messageHandler = (event) => {
      if (
        event.origin !== 'https://www.facebook.com' &&
        event.origin !== 'https://web.facebook.com'
      ) {
        return;
      }

      try {
        const data = JSON.parse(event.data);

        if (data.type === 'WA_EMBEDDED_SIGNUP') {
          if (data.event === 'FINISH') {
            const { phone_number_id, waba_id } = data.data;

            setPhoneNumberId(phone_number_id);


            
            setWabaId(waba_id);
            
            console.log('Phone number ID:', phone_number_id, 'WhatsApp business account ID:', waba_id);

          } else if (data.event === 'CANCEL') {

            const { current_step } = data.data;

            console.warn('Cancelled at:', current_step);

          } else if (data.event === 'ERROR') {
            const { error_message } = data.data;

            console.error('Error:', error_message);

          }
        }
      } catch (error) {
        console.log('Invalid message data', error);
      }
    };

    window.addEventListener('message', messageHandler);

    return () => window.removeEventListener('message', messageHandler);
  }, []);

  const fbLoginCallback = (response) => {
    if (response.authResponse) {
      const code = response.authResponse.code;
      
      setResponseCode(code);

      setIsAuthInProgress(true);

    }
  };

  const create_WABA = async (WABA) => {
    if (!session || !session.user) {
      console.error('User session is not available');
      
      return;
    }

    try {
      const businessId = session.user.businessId;
      const userId = session.user.id;
      const credentials = btoa(`${userId}@${businessId}`);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/WABA`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ WABA }),
      });

      if (res.status === 201) {
        setButtonText('Authenticated With Facebook!');
        setIsAuthInProgress(false);
      } else {
        const data = await res.json().catch(() => null);
        const errorMessage = data?.error?.message || 'Failed to create channel';
        
        throw new Error(errorMessage);
      }

      const responseData = await res.json();
      
    } catch (error) {
      setIsAuthInProgress(false);
      throw error;
    }
  };

  useEffect(() => {
    if (phoneNumberId && wabaId && responseCode) {
      const WABA = {
        responseCode: responseCode,
        WABA_ID: wabaId,
        phoneNumberId: phoneNumberId,
      };

      toast.promise(create_WABA(WABA), {
        pending: 'Authorizing...',
        success: 'Authorized successfully!',
        error: {
          render({ data }) {
            return data.message;
          },
        },
      });
    }
  }, [phoneNumberId, wabaId, responseCode]);

  const launchWhatsAppSignup = () => {
    if (window.FB) {
      window.FB.login(fbLoginCallback, {
        config_id: configId,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: '',
          sessionInfoVersion: '2',
        },
      });
    }
  };

  const isButtonCurrentlyDisabled = isButtonInitiallyDisabled || isAuthInProgress;

  return (
    <Card>
      <CardHeader title='Authorize Facebook for WhatsApp Business' />
      <CardContent className='flex flex-col items-start gap-6'>
        <div className='flex flex-col gap-4'>
          <Typography>
            You need to authorize our Facebook app to access your WhatsApp Business account.
          </Typography>
          <Typography>
            This will enable us to send messages, manage your WhatsApp Business settings, and ensure a smooth
            integration with your Facebook business page.
            <br />
            <Link className='text-primary'>Learn more about WhatsApp Business API integration.</Link>
          </Typography>
        </div>

        <div className='w-full flex justify-end'>
          <Button
            variant='contained'
            size='large'
            onClick={launchWhatsAppSignup}
            className='bg-blue-600 text-white'
            disabled={isButtonCurrentlyDisabled}
          >
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacebookWhatsAppAuth;
