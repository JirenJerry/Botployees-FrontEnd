'use client'

// Next Imports
import { redirect } from 'next/navigation'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const RoleRedirect = ({ lang }) => {


  // ℹ️ Bring me `lang`
  const homePage = getLocalizedUrl(themeConfig.homePageUrl, lang)
  
  return redirect(homePage)
}

export default RoleRedirect
