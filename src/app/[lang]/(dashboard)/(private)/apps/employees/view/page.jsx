'use server'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
// Component Imports
import UserLeftOverview from '@views/apps/employees/view/user-left-overview'
import UserRight from '@views/apps/employees/view/user-right'

const ServicesTab = dynamic(() => import('@/views/apps/employees/view/user-right/services'))

// Vars
const tabContentList = data => ({
  services: <ServicesTab />
})

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/pages/pricing` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
/* const getPricingData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/pricing`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
} */
  const getEmployeeData = async (businessId, userId,employeeId) => {
    try {
      // Encode credentials in base64 for basic authentication
      const credentials = btoa(`${userId}@${businessId}`);
  
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/business/employee/${employeeId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${credentials}`, 
          'Content-Type': 'application/json',    
        }
      });
  
      // Ensure businessId is valid
      if (businessId && businessId !== null) {

        // Check if the request was successful
        if (!res.ok) {
          throw new Error('Failed to fetch employee data');

        }
  
        // Parse and return the JSON response
        const responseData = await res.json();
        
        console.log('Employee Data:', responseData.data[0]);
  
        // Return the employee data (adjust depending on the structure of responseData)
        return responseData.data !== undefined ? responseData.data[0] : [];
      
      }
    } 
    catch (error) {
      console.error('Error fetching employees data:', error);
      
      return []; // Return null if an error occurs
    
    }
  };
const UserViewTab = async () => {
  // Vars

  const session = await getServerSession(authOptions())

  let employeeData = await getEmployeeData(session.user.businessId,session.user.id,session.currentEmployeeId)
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <UserLeftOverview {...employeeData} />
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        <UserRight tabContentList={tabContentList()} />
      </Grid>
    </Grid>
  )
}

export default UserViewTab
