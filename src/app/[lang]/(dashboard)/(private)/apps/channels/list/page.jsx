// Component Imports
'use server'

import { getServerSession } from 'next-auth'

import ChannelList from '@views/apps/channels/list'

import { authOptions } from '@/libs/auth'

// Data Imports

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/user-list` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
/* const getUserData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
} */
const getChannels = async (businessId, userId) => {
  try {
    // Encode credentials in base64 for basic authentication
    const credentials = btoa(`${userId}@${businessId}`)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/business/${businessId}/channels`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${credentials}`,
        'Content-Type': 'application/json'
      }
    })

    // Ensure businessId is valid
    if (businessId && businessId !== null) {
      // Check if the request was successful
      if (!res.ok) {
        throw new Error('Failed to fetch Channels data')
      }

      // Parse and return the JSON response
      const responseData = await res.json()

      return responseData.data !== undefined ? responseData.data : []
    }
  } catch (error) {
    console.error('Error fetching Channels data:', error)

    return [] // Return null if an error occurs
  }
}

const UserListApp = async () => {
  // Vars
  const session = await getServerSession(authOptions())
  const data = await getChannels(session?.user?.businessId, session?.user?.id)
 
  return <ChannelList channelData={data} session={session}  />
}

export default UserListApp
