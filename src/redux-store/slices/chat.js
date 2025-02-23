// Third-party Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Remove the fake-db import
// import { db } from '@/fake-db/apps/chat'

// Create an async thunk that fetches chat data based on the businessId.

export const fetchChatData = createAsyncThunk(
  'chat/fetchChatData',
  async (session, thunkAPI) => {
    try {
      const credentials = btoa(`${session?.user?.id}@${session?.user?.businessId}`);

      
      console.log('getting chats for business ', session?.user?.businessId);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/assistants/asst_ArymJE1hA0IzPLk9VuWY43fy/threads`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${credentials}`,
          
        }
      });

      if (!response.ok) {
        return thunkAPI.rejectWithValue('Failed to fetch chat data');
      }

      let result = await response.json(); 
      
      return result.data[0];
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  profileUser: {},
  contacts: [],
  chats: [],
  activeUser: null,
  loading: false,
  error: null
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getActiveUserData: (state, action) => {
      const activeUser = state.contacts.find(user => user.id === action.payload);
      const chat = state.chats.find(chat => chat.userId === action.payload);

      if (chat && chat.unseenMsgs > 0) {
        chat.unseenMsgs = 0;
      }

      if (activeUser) {
        state.activeUser = activeUser;
      }
    },
    addNewChat: (state, action) => {
      const { id } = action.payload;

      state.contacts.find(contact => {
        if (contact.id === id && !state.chats.find(chat => chat.userId === contact.id)) {
          state.chats.unshift({
            id: state.chats.length + 1,
            userId: contact.id,
            unseenMsgs: 0,
            chat: []
          });
        }
      });
    },
    setUserStatus: (state, action) => {
      state.profileUser = {
        ...state.profileUser,
        status: action.payload.status
      };
    },
    sendMsg: (state, action) => {
      const { msg } = action.payload;
      const existingChat = state.chats.find(chat => chat.userId === state.activeUser?.id);

      if (existingChat) {
        existingChat.chat.push({
          message: msg,
          time: new Date(),
          senderId: state.profileUser.id,
          msgStatus: {
            isSent: true,
            isDelivered: false,
            isSeen: false
          }
        });

        // Remove the chat from its current position
        state.chats = state.chats.filter(chat => chat.userId !== state.activeUser?.id);

        // Add the chat back to the beginning of the array
        state.chats.unshift(existingChat);
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchChatData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchChatData.fulfilled, (state, action) => {
        state.loading = false;

        // Update the state with data from your API:

        state.profileUser = action.payload.profileUser;
        state.contacts = action.payload.contacts;
        state.chats = action.payload.chats;
      })
      .addCase(fetchChatData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

export const { getActiveUserData, addNewChat, setUserStatus, sendMsg } = chatSlice.actions;
export default chatSlice.reducer;
