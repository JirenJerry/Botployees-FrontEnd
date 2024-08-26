'use server' 

// Next Imports
import dynamic from 'next/dynamic'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'


// Component Imports
import Settings from '@views/apps/business/settings'

const BusinessDetails = dynamic(() => import('@/views/apps/business/settings/business-details'))
const PaymentsTab = dynamic(() => import('@views/apps/business/settings/payments'))
const LocationsTab = dynamic(() => import('@views/apps/business/settings/locations'))

// Vars
const tabContentList = () => ({
  'business-details': <BusinessDetails />,
  payments: <PaymentsTab  />,
  locations: <LocationsTab  />
})

const businessSettings =async  () => {
  const session = await getServerSession(authOptions())
  
  return  <Settings session={session} tabContentList={ tabContentList()} />
}

export default businessSettings
