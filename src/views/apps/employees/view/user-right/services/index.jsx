// MUI Imports

import Grid from '@mui/material/Grid'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'

import ProductListTableServices from '@views/apps/employees/view/user-right/services/ProductListTableServices'

const getBusinessServices = async (businessId, userId) => {
  try {
    // Encode credentials in base64 for basic authentication
    const credentials = btoa(`${userId}@${businessId}`)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/customers/products/category/Services`, {
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
        throw new Error('Failed to fetch products data')
      }

      // Parse and return the JSON response
      const responseData = await res.json()



      // Return the employee data (adjust depending on the structure of responseData)
      return responseData.data !== undefined ? responseData.data[0] : []
    }
  } catch (error) {
    console.error('Error fetching products data:', error)

    return [] // Return null if an error occurs
  }
}

const ServicesTab = async () => {
  const session = await getServerSession(authOptions())

  const products = await getBusinessServices(session.user.businessId, session.user.id)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductListTableServices productData={products} />
      </Grid>
    </Grid>
  )
}

export default ServicesTab
