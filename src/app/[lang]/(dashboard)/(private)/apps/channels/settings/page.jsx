'use server';

import dynamic from 'next/dynamic';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/libs/auth';

import ChannelsSettings from '@views/apps/channels';


// Dynamically import the WhatsAppTab component
const WhatsAppTab = dynamic(() => import('@views/apps/channels/whatsapp'), {
  ssr: false,
});

// Function to fetch WABA data
const getWABAData = async (businessId, userId) => {
  try {
    const credentials = btoa(`${userId}@${businessId}`);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/waba`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${credentials}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
    
      throw new Error('Failed to fetch WABA data');
    }

    const responseData = await res.json();
    
    return responseData.data && responseData.data.length > 0;
  } catch (error) {
    console.error('Error fetching WABA data:', error);
    
    return false;
  }
};

// Main component
const ChannelsPage = async () => {
  const session = await getServerSession(authOptions());

  const hasWABAData = await getWABAData(session?.user?.businessId, session?.user?.id);

  const tabContentList = {
    WhatsApp: <WhatsAppTab isButtonDisabled={hasWABAData} />,
  };

  return <ChannelsSettings tabContentList={tabContentList} />;
};

export default ChannelsPage;
