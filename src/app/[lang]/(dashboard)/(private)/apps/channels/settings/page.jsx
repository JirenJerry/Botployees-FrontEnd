// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import ChannelsSettings from '@views/apps/channels'

const WhatsAppTab = dynamic(() => import('@views/apps/channels/whatsapp'))

// Vars
const tabContentList = () => ({
  WhatsApp: <WhatsAppTab />
})

const ChannelsPage = () => {
  return <ChannelsSettings tabContentList={tabContentList()} />
}

export default ChannelsPage
