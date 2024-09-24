'use client'

// React Imports
import { useEffect } from 'react'

// Component Imports
import BodySection from '@views/front-pages/termsOfService/bodySection'

import { useSettings } from '@core/hooks/useSettings'

const TermsOfServiceWrapper = ({ data }) => {
  // Hooks
  const { updatePageSettings } = useSettings()

  // For Page specific settings
  useEffect(() => {
    return updatePageSettings({
      skin: 'default'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BodySection />
    </>
  )
}

export default TermsOfServiceWrapper
