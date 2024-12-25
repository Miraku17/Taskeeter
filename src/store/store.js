// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import quoteReducer from '@/features/quote/quoteSlice'


const store = configureStore({
  reducer: {
    user: userReducer,
    quote: quoteReducer 
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;