'use client'

// React Imports
import { useEffect, useRef, useState } from 'react'

// next-auth imports
import { useSession } from 'next-auth/react'

// MUI Imports
import Backdrop from '@mui/material/Backdrop'
import useMediaQuery from '@mui/material/useMediaQuery'

// Third-party Imports
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

// Slice Imports
import { getActiveUserData, fetchChatData } from '@/redux-store/slices/chat'

// Component Imports
import SidebarLeft from './SidebarLeft'
import ChatContent from './ChatContent'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { commonLayoutClasses } from '@layouts/utils/layoutClasses'

const ChatWrapper = () => {
  // Get session from next-auth. businessId is expected to be stored in session.user.businessId.
  const { data: session, status } = useSession()

  // States
  const [backdropOpen, setBackdropOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Refs
  const messageInputRef = useRef(null)

  // Hooks
  const { settings } = useSettings()
  const dispatch = useDispatch()
  const chatStore = useSelector(state => state.chatReducer)
  const isBelowLgScreen = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const isBelowMdScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // When the session is ready, dispatch the thunk with the entire session object.
  useEffect(() => {
    let interval;
  
    if (status === 'authenticated' && session?.user) {
      // Fetch data immediately
      dispatch(fetchChatData(session));
  
  
      interval = setInterval(() => {
        dispatch(fetchChatData(session));
      }, 20000);
    }
  
    return () => {
      if (interval) {
        clearInterval(interval); 
      }
    };
  }, [dispatch, session, status]);
 
  const activeUser = id => {
    dispatch(getActiveUserData(id))
  }

  
  useEffect(() => {
    if (chatStore.activeUser?.id && messageInputRef.current) {
      messageInputRef.current.focus()
    }
  }, [chatStore.activeUser])

  // Close backdrop when sidebar is open on below md screen
  useEffect(() => {
    if (!isBelowMdScreen && backdropOpen && sidebarOpen) {
      setBackdropOpen(false)
    }
  }, [isBelowMdScreen, backdropOpen, sidebarOpen])

  // Open backdrop when sidebar is open on below sm screen
  useEffect(() => {
    if (!isBelowSmScreen && sidebarOpen) {
      setBackdropOpen(true)
    }
  }, [isBelowSmScreen, sidebarOpen])

  // Close sidebar when backdrop is closed on below md screen
  useEffect(() => {
    if (!backdropOpen && sidebarOpen) {
      setSidebarOpen(false)
    }
  }, [backdropOpen, sidebarOpen])

  return (
    <div
      className={classNames(
        commonLayoutClasses.contentHeightFixed,
        'flex is-full overflow-hidden rounded relative',
        {
          border: settings.skin === 'bordered',
          'shadow-md': settings.skin !== 'bordered'
        }
      )}
    >
      <SidebarLeft
        chatStore={chatStore}
        getActiveUserData={activeUser}
        dispatch={dispatch}
        backdropOpen={backdropOpen}
        setBackdropOpen={setBackdropOpen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isBelowLgScreen={isBelowLgScreen}
        isBelowMdScreen={isBelowMdScreen}
        isBelowSmScreen={isBelowSmScreen}
        messageInputRef={messageInputRef}
      />

      <ChatContent
        chatStore={chatStore}
        dispatch={dispatch}
        backdropOpen={backdropOpen}
        setBackdropOpen={setBackdropOpen}
        setSidebarOpen={setSidebarOpen}
        isBelowMdScreen={isBelowMdScreen}
        isBelowLgScreen={isBelowLgScreen}
        isBelowSmScreen={isBelowSmScreen}
        messageInputRef={messageInputRef}
      />

      <Backdrop open={backdropOpen} onClick={() => setBackdropOpen(false)} className="absolute z-10" />
    </div>
  )
}

export default ChatWrapper
