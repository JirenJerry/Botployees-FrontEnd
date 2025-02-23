'use server'

// Next Imports
import dynamic from 'next/dynamic'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'

import 'react-toastify/dist/ReactToastify.css'

// Component Imports
import Settings from '@views/apps/business/settings'

const getBusinessData = async (businessId, userId) => {
  try {
    // Encode credentials in base64 for basic authentication
    const credentials = btoa(`${userId}@${businessId}`);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/business`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${credentials}`, // Add Basic Auth header
        'Content-Type': 'application/json',     // Specify the content type
      }
    });

    if (businessId && businessId != null) {
      if (!res.ok) {
        throw new Error('Failed to fetch business data');
      }

      let responseData= await res.json();  // Parse and return the JSON response
      
      return responseData.data[0]

    }
  } catch (error) {
    
    return null;

  }
}


const businessSettings = async () => {
  const session = await getServerSession(authOptions())
  
  let businessData = await getBusinessData(session?.user?.businessId,session?.user?.id)
 
  console.log(businessData)
  
  return <Settings session={session}  initialBusinessData={businessData} />
}

export default businessSettings
